var cron = require('cron');
var Order = require('../../models/index').order;

var removeUncompleteOrder = () => {
    console.log('JOB AUTO DELETE ORDER WITH UNCOMPLETED AFTER 1 DAY WAS CREATED!');
    return new cron.CronJob({
        cronTime: '00 30 * * * *',
        onTick: function () {
            Order.find({
                status: 0
            }).exec((err, orders) => {
                if (orders) {
                    var now = Date.now();
                    orders.forEach(order => {
                        var createdOrder = new Date(order.created_at);
                        var id = order._id;
                        if (now - createdOrder > 86400000) {
                            order.remove((err) => {
                                if (!err) {
                                    console.log(`ORDER #${id} HAS BEEN REMOVED`);
                                }
                            });
                        }
                    });
                }
            });
        },
        start: true,
        timeZone: 'Asia/Ho_Chi_Minh'
    }).start();
}

module.exports = {
    removeUncompleteOrder: removeUncompleteOrder
}