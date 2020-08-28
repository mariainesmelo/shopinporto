const { Stores, Categories, Zones } = require('./db');

module.exports = {
    getCategories: function() {
        let categories =  [...Categories];
        return {
            status: 200,
            data: categories
        };
    },
    getZones: function() {
        let zones =  [...Zones];
        return {
            status: 200,
            data: zones
        };
    },
    getStores: function (nStores = 10, sortBy='name') {
        let sortedStores =  [...Stores];
        console.log(sortedStores[0]);
        sortBy === 'name' ? 
        sortedStores.sort((a,b) => a.price - b.price) : 
        sortedStores.sort((a,b) => {
                const aProp = a[sortBy].toUpperCase();
                const bProp = b[sortBy].toUpperCase();
                if (aProp < bProp) {
                    return -1;
                  }
                return aProp > bProp ? 1 : 0;
                });
        return {
            status: 200,
            data: sortedStores.slice(0, nStores)
        }
    },
    getStore: function (storeId) {
        if(!storeId || storeId < 1) { 
            return {
                status: 400
            }
        }
        // if(Stores.length < storeId) {
        //     return {
        //         status: 404
        //     }
        // }
        const store = Stores[storeId - 1];
        return {
            status: 200,
            data: store
        };
    }
}