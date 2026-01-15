const prisma = require('../config/db');
const createBooking  = async (itemId, startTime, endTime)=> {
    const existingBooking = await prisma.booking.findFirst({
        where: {
            itemId: itemId,
            AND: [
                {startTime: { lt: new Date(endTime)}},
                {endTime:{gt: new Date(startTime)}}
            ]
        }
    });
if (existingBooking){
   throw new Error("This time slot is already booked. Please choose another time.");

}
return await prisma.booking.create({
    data:{
        itemId,
        startTime: new Date(startTime),
        endTime: new Date(endTime)

    }
});
};

