import {getShopById, postShop, putShop} from "../services/shop.js";
import {createHttpError} from "../utils/create-http-error.js";

export const getShopByIdController = async (req, res) => {
    const {shopId} = req.params;

    const shop = await getShopById(shopId);

    res.json({
        status: 200,
        message: `Successfully found product with id ${shopId}!`,
        data: shop,
    });
};

export const createShopController = async (req, res) => {
    const shop = await postShop(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a shop!",
        data: shop,
    });
};

export const updateShopController = async (req, res, next) => {
    const {shopId} = req.params;

    const result = await putShop(shopId, req.body, {upsert: true});

    if (!result) {
        next(createHttpError(404, 'Shop not found'));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a product!`,
        data: result,
    });
};