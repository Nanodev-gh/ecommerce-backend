import { Order } from "../models/Order.js"

export async function createOrder(req, res) {
    const { body } = req;
    const userId = req.user.id; 
    try {
        const newOrder = await Order.create({...body, userId});
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getOrder(req, res) {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function getUserOrder(req, res) {
    const userId = req.user.id; 
    try {
        const order = await Order.findById({ userId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteOrder(req, res) {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order has been deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function cancelOrder(req, res) {
    const { id } = req.params;
    const userId = req.user.id; 
    try {
        const order = await Order.findOneAndUpdate(
            { _id: id, userId },
            { status: 'canceled' },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found or not authorized to cancel" });
        }
        res.status(200).json({ message: "Order has been canceled", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


