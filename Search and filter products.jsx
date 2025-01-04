// Search and Filter Products
router.get('/search', async (req, res) => {
    try {
        const { name, category, stockStatus } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = category;
        if (stockStatus === 'low') query.stockLevel = { $lte: 10 };
        if (stockStatus === 'out') query.stockLevel = 0;

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
