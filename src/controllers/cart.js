import { Cart } from "../models/Cart.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});


export async function createCart(req, res) {
    const { body } = req;
    const userId = req.user.id; 

    try {
        const newCart = await Cart.create({ ...body, userId });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCart(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateCart(req, res) {
    const userId = req.user.id; 
    const { body } = req;

    try {
        const updatedCart = await Cart.findOneAndUpdate({ userId }, { $set: body }, { new: true });
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function deleteCart(req, res) {
    const userId = req.user.id;
    const { cartId } = req.params;
    try {
        const deletedCart = await Cart.findOneAndDelete({ userId, _id: cartId });
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getAllCarts(req, res) {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartById(req, res) {
    const { cartId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function addItemToCart(req, res) {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $addToSet: { products: { productId, quantity } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function removeItemFromCart(req, res) {
    const userId = req.user.id; 
    const { productId } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function clearCart(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { products: [] },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function checkoutCart(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { status: "checked out" },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function applyDiscount(req, res) {
    const userId = req.user.id; 
    const { discountCode } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { discountCode },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartItems(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId }, 'products');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function updateCartItemQuantity(req, res) {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId, "products.productId": productId },
            { $set: { "items.$.quantity": quantity } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found or item not in cart" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartTotal(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId }, 'products');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const total = cart.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartHistory(req, res) {
    const userId = req.user.id; 

    try {
        const carts = await Cart.find({ userId }).sort({ createdAt: -1 });
        if (!carts.length) {
            return res.status(404).json({ message: "No cart history found" });
        }
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function restoreCart(req, res) {
    const userId = req.user.id; 
    const { cartId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart || cart.userId !== userId) {
            return res.status(404).json({ message: "Cart not found or does not belong to user" });
        }
        const restoredCart = await Cart.create({ ...cart.toObject(), userId });
        res.status(201).json(restoredCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartSummary(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId }, 'products');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const summary = {
            itemCount: cart.products.length,
            totalQuantity: cart.products.reduce((acc, product) => acc + product.quantity, 0),
            totalPrice: cart.products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        };
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartItemDetails(req, res) {
    const userId = req.user.id; 
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId, "products.productId": productId }, 'products.$');
        if (!cart || !cart.products.length) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        res.status(200).json(cart.products[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getCartItemCount(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId }, 'products');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemCount = cart.products.reduce((acc, product) => acc + product.quantity, 0);
        res.status(200).json({ itemCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export async function checkOut(req, res) {
    const userId = req.user.id; 

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const lineItems = cart.products.map(product => ({
            price_data: {
                currency: 'ghs',
                product_data: {
                    name: product.productId, // You may want to fetch the product details to get the name
                },
                unit_amount: product.price * 100, // Stripe expects the amount in cents
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
            currency: 'ghs', // Set currency to Ghana Cedis
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}