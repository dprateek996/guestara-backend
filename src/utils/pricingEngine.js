const calculateFinalPrice = (item, quantity = 1, requestedTime = new Array()) => {
    let price = item.base_price;
    
    switch (item.pricing_type){
        case 'STATIC':
            price = item.base_price;
           break;
    
        case 'TIERED':

           const tiers = item.pricing_details;
           const activeTier = tiers.find(t=> quantity >= t.min && quantity <= t.max);
           price = activeTier ? activeTier.price: item.base_price;
           break;
            
         case 'COMPLIMENTARY':
            price = 0;
            break;

         case 'DYNAMIC':
            const {start_time, end_time, surge_price} = item.pricing_details;
            const now = new Date().toTimeString().slice(0,5);
            if(now>= start_time && now <= end_time){
                price = surge_price;
            }
            break;
    
        case 'DISCOUNTED':
            const {discount_type, value} = item.pricing_details;
            price = discount_type === 'PERCENT'
               ? price-(price*(value/ 100))
               : price - value;
             break;
    }

    return price;
};

module.exports = {calculateFinalPrice};