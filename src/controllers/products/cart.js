const db = require("../../database/models");

let cartControllers = {
  addToCart: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send("Debés iniciar sesión para agregar productos al carrito.");
      }

      const userId = req.session.user.id;
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity, 10) || 1;

      let cart = await db.ShoppingCart.findOne({ where: { user_id: userId } });
      if (!cart) {
        cart = await db.ShoppingCart.create({ user_id: userId, total: 0 });
      }

      let cartItem = await db.CartItem.findOne({
        where: { cart_id: cart.id, product_id: productId },
      });

      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send("Producto no encontrado.");
      }

      if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.price = product.price * cartItem.quantity;
        await cartItem.save();
      } else {
        await db.CartItem.create({
          cart_id: cart.id,
          product_id: productId,
          quantity,
          price: product.price * quantity,
        });
      }

      const cartItems = await db.CartItem.findAll({ where: { cart_id: cart.id } });
      const newTotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

      if (isNaN(newTotal)) throw new Error("El total del carrito no es válido.");

      cart.total = newTotal;
      await cart.save();

      res.redirect(`/products/${productId}`);
    } catch (error) {
      console.error("🛒 Error en addToCart:", error.message);
      res.status(500).send("Error al agregar el producto al carrito.");
    }
  },

  showCart: async (req, res) => {
    try {
      const userId = req.session.user.id;

      let cart = await db.ShoppingCart.findOne({
        where: { user_id: userId },
        include: [{ model: db.CartItem, include: [{ model: db.Product }] }],
      });

      if (!cart || cart.CartItems.length === 0) {
        return res.render("products/productCart", {
          cartItems: [],
          cartTotal: 0,
        });
      }

      const cartItems = cart.CartItems;
      const cartTotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

      res.render("products/productCart", { cartItems, cartTotal });
    } catch (error) {
      console.error("🛒 Error en showCart:", error.message);
      res.status(500).send("No se pudo mostrar el carrito.");
    }
  },

  increaseItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;
      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) return res.status(404).send("Item no encontrado en el carrito.");

      const product = await db.Product.findByPk(cartItem.product_id);
      if (!product) return res.status(404).send("Producto no encontrado.");

      cartItem.quantity += 1;
      cartItem.price = product.price * cartItem.quantity;
      await cartItem.save();

      const cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total = await db.CartItem.sum("price", { where: { cart_id: cart.id } });
      await cart.save();

      res.redirect("/products/cart");
    } catch (error) {
      console.error("🛒 Error en increaseItem:", error);
      res.status(500).send("No se pudo aumentar la cantidad del producto.");
    }
  },

  decreaseItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;
      let cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) return res.status(404).send("Item no encontrado.");

      const product = await db.Product.findByPk(cartItem.product_id);
      if (!product) return res.status(404).send("Producto no encontrado.");

      cartItem.quantity -= 1;
      cartItem.price = product.price * cartItem.quantity;

      if (cartItem.quantity <= 0) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }

      const cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total = await db.CartItem.sum("price", { where: { cart_id: cart.id } }) || 0;
      await cart.save();

      res.redirect("/products/cart");
    } catch (error) {
      console.error("🛒 Error en decreaseItem:", error.message);
      res.status(500).send("No se pudo reducir la cantidad del producto.");
    }
  },

  removeItem: async (req, res) => {
    try {
      const cartItemId = req.params.id;
      const cartItem = await db.CartItem.findByPk(cartItemId);
      if (!cartItem) return res.status(404).send("Producto no encontrado en el carrito.");

      const cart = await db.ShoppingCart.findByPk(cartItem.cart_id);
      cart.total -= cartItem.price;
      await cart.save();

      await cartItem.destroy();
      res.redirect("/products/cart");
    } catch (error) {
      console.error("🛒 Error en removeItem:", error.message);
      res.status(500).send("No se pudo eliminar el producto del carrito.");
    }
  },

  checkout: async (req, res) => {
    try {
      const userId = req.session.user.id;
      if (!userId) return res.status(401).send("Tenés que iniciar sesión.");

      const cart = await db.ShoppingCart.findOne({ where: { user_id: userId } });
      if (!cart) return res.status(404).send("Carrito no encontrado.");

      const cartItems = await db.CartItem.findAll({
        where: { cart_id: cart.id },
        include: [{ model: db.Product }],
      });

      if (!cartItems.length) return res.status(400).send("El carrito está vacío.");

      for (const item of cartItems) {
        if (isNaN(item.product_id)) return res.status(400).send("ID de producto inválido.");
        const product = await db.Product.findByPk(item.product_id);
        if (!product) return res.status(404).send(`Producto con ID ${item.product_id} no encontrado.`);
        await db.Sale.create({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          total: item.price,
          sale_date: new Date(),
        });
      }

      await db.CartItem.destroy({ where: { cart_id: cart.id } });
      cart.total = 0;
      await cart.save();

      res.render("products/checkoutConfirmation", {
        message: "¡Compra realizada con éxito!",
      });
    } catch (error) {
      console.error("🛒 Error en checkout:", error);
      res.status(500).send("Ocurrió un error al procesar tu compra.");
    }
  },
};

module.exports = cartControllers;
