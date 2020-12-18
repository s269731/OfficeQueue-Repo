const Telegram=require('telegraf')
const serviceTypesDao = require('./serviceTypesDao')
const countersDao = require('./countersDao')
const ticketsDao = require('./ticketsDao')
const commandParts = require('telegraf-command-parts');


const bot= new Telegram('1258270643:AAE7k-7Xlw3u-aXLED08ddk_DH4hKyKqIuY')
bot.use(commandParts());
const helpMessage='Hello and welcome in Office Queue Bot! \n\n \t1- You can retrieve the list of services with command /services \n\n  \t2- You can use the id of service to pick a new ticket with command /pickTicket adding the id number (i.e. /pickTicket 1) \n\n \t3- You can see the list of counters with command /counters \n\n \t4- You can see the actual number served by a specific counter with command /counter adding the counter id number (i.e. /counter 1)\n\n \t 5- You can call a new ticket with command /callTicket adding the counter id number (i.e. /callTicket 1) '

bot.help(ctx=>ctx.reply(helpMessage))
bot.command('services', ctx=>{
    let services= `Services: \n`;
    serviceTypesDao.getServiceTypes()
        .then((serviceTypes) => {
            serviceTypes.forEach(e=>{
                services +=`${e.id}. ${e.sign}: ${e.name} --- ${e.service_time} min \n`
            })
            ctx.reply(services)
        })
        .catch((err) => {
            ctx.reply('Error')
        })
})
bot.command('counters', ctx=>{
    let counters= `Counters : \n`;
    countersDao.getCounters()
        .then((res) => {
            res.forEach(c=>{
                counters+=`${c.id}. ${c.name} \n`
            })
            ctx.reply(counters)
        })
        .catch((err) => {
            ctx.reply('Error')
        })

})

//command: /counter :counterId
bot.command('counter', ctx=>{
    const args=ctx.state.command.args
    if(args.length===0){
        ctx.reply('Please specify a counter id!\n\n i.e. /counter 1')
        return ;
    }
    let info= `Counter ${args[0]} : \n`;
    countersDao.getCounter(args[0])
        .then((counters) => {
           info+=`Number served: ${counters.currentTicketNumber}`;
            ctx.reply(info)
        })

        .catch((err) => {
            ctx.reply('Error')
        })

})
//command: /callTicket :counterId
bot.command('callticket', ctx=>{
    const args=ctx.state.command.args
    if(args.length===0){
        ctx.reply('Please specify a counter id!\n\n i.e. /callticket 1')
        return ;
    }
    let info= `Next user for counter ${args[0]} \n \n`;
    countersDao.getNewTicketToServe(args[0])
        .then((counters) => {
            info+=`Ticket number: ${counters.ticketNumber}\n`;
            ctx.reply(info)
        })
        .catch((err) => {
                ctx.reply('Error')
        })
})

//command: /pickTicket serviceId
bot.command('pickticket', ctx=>{
    const args=ctx.state.command.args
    if(args.length===0){
        ctx.reply('Please specify a service id!\n\n i.e. /pickticket 1')
        return ;
    }

    let info= ``;
    ticketsDao.addTicket(args[0])
        .then((res) => {
            info+=`Your number for service ${args[0]} is ${res.ticketNumber}\n\n You should wait for ${res.waitingTime.toFixed(0)} min\n\n`;
            ctx.reply(info)
        })
        .catch((err) => {
            ctx.reply('Error')
        })
})

bot.launch()