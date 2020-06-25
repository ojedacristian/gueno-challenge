const fetch = require('node-fetch');

let userData = {
    message: '',
    datos: '',
    status:''
};

const index = (req, res) => {
    res.render('index', {
        title: 'Gueno Challenge',
        userData
    });
};

const procesar = (req, res, next) => {
    const { dni } = req.body;
    fetch(`https://api.gueno.com.ar/challenge/getCuit/${dni}`)
        .then(res => res.json())
        .then(datadni => {
            if(datadni.success === true) {
                console.log(`datadni - true: ${datadni.success}`)
                fetch(`https://api.gueno.com.ar/challenge/getUserData/${datadni.data.cuit}`)
                .then(res => res.json())
                .then(datos => {
                    console.log(datos);
                    if(datos.success === true) {
                        userData.message = datos.message;
                        const scoring = datos.data.scoring.approved == false ? 'RECHAZADO' : 'APROBADO';
                        const date = new Date(datos.data.birthday);
                        const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
                        const birthday = `${date.getDay()+1} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
                        userData.datos = {
                            name: `${datos.data.name} ${datos.data.surname}`,
                            birthday,
                            scoring,
                            cuit: datadni.data.cuit
                        }
                        userData.status = 'success';
                        console.log(`datos true - ${datos}`);
                        res.redirect('/');
                    } else {
                        userData.message = datos.message;
                        userData.status = 'error';
                        userData.datos = '';
                        console.log(`datos true - ${datos}`);
                        res.redirect('/');
                    }
                })
            } else {
               userData.message = datadni.message;
               userData.status = 'error';
               userData.datos = '';
               console.log(`datadni - false: ${datadni}`);
               res.redirect('/');
            }
        });
}

module.exports = {
    index,
    procesar
}