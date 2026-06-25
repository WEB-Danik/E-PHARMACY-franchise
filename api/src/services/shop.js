import {shopCollection} from "../config/db/models/shop.js";

export const getShopById = async (shopId) => {
    const shop = await shopCollection.findById(shopId);
    return shop;
};

export const postShop = async (payload) => {
    const shop = await shopCollection.create(payload);
    return shop;
};


export const putShop = async (shopId, payload, options) => {
    const rawResult = await shopCollection.findOneAndUpdate(
        {_id: shopId},
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        shop: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};