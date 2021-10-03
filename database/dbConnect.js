const mongoose = require('mongoose')

require('dotenv').config()
mongoose
    .connect(process.env.db_Host, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Veri Tabanına bağlanıldı.`)
    })
    .catch((hata) => {
        console.log('Db Bağlantı Hatası')
    })
