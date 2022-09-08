const fs = require("fs");

class Contenedor {

    constructor(ruta) {
        this.ruta = ruta;
    }


    async create() {

        try {
            if (fs.existsSync(`./${this.ruta}.txt`)) {
                console.log("El archivo ya existe")

            } else {
                await fs.promises.writeFile(`./${this.ruta}.txt`, JSON.stringify('[]', null, 2), 'utf-8');
                console.log("Creando Archivo.....");
                if (fs.existsSync(`./${this.ruta}.txt`)) {
                    console.log(`El archivo ${this.ruta} se creo con exito`);
                }
            }
            return;
        } catch (error) {
            return null;
        }
    }



    async getAll() {
        if (fs.existsSync(`./${this.ruta}.txt`)) {
            try {
                const contenido = await fs.promises.readFile(`./${this.ruta}.txt`, 'utf-8');
                return JSON.parse(contenido);
            } catch (error) {
                console.log(`No se pudo leer el archivo ${this.ruta}`);
                return null;
            }
        } else {
            console.log(`El archivo ${this.ruta} no existe...`)
            setTimeout(() => { this.create() }, 2000);
        }
    }

    async saveNew(productoNuevo) {
        try {
            const contenido = await this.getAll();
            if (contenido == null || contenido == "") {
                try {
                    productoNuevo.id = 1;
                    const ingreso = [productoNuevo];
                    await fs.promises.writeFile(`./${this.ruta}.txt`, JSON.stringify(ingreso, null, 2), 'utf-8');
                    console.log(`Producto ${productoNuevo.title} agregado con exito`);
                } catch (error) {
                    return null;
                }
            } else {
                if (contenido.length == 1) {
                    productoNuevo.id = 2;
                    contenido.push(productoNuevo);
                    await fs.promises.writeFile(`./${this.ruta}.txt`, JSON.stringify(contenido, null, 2), 'utf-8');
                    console.log(`Producto ${productoNuevo.title} agregado con exito`);
                } else {
                    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
                    productoNuevo.id = indice + 1;
                    contenido.push(productoNuevo);
                    await fs.promises.writeFile(`./${this.ruta}.txt`, JSON.stringify(contenido, null, 2), 'utf-8');
                    console.log(`Producto ${productoNuevo.title} agregado con exito`);
                }
            }
        } catch (error) {
            return null;
        }

    }


    async getById(id) {
        try {
            const contenido = await this.getAll();
            if (contenido != "") {
                const productoBuscado = contenido.find(producto => producto.id === id);
                if (productoBuscado) {
                    return productoBuscado;
                } else {
                    console.log(`No existe ningun producto con el Id: ${id}`);
                    return null;
                }
            } else {
                console.log("No se puede buscar ningun producto debido a que el archivo se encuentra vacio");
            }
        } catch (error) {
            return null;
        }
    };

    async deleteById(id) {
        let comprobar = 1;
        try {
            const contenido = await this.getAll();
            if (contenido != "") {
                let tamañoArrayEntrada = contenido.length;
                const contenidoActualizado = contenido.filter(producto => producto.id !== id);
                let tamañoArraySalida = contenidoActualizado.length;
                if (tamañoArrayEntrada == tamañoArraySalida) {
                    console.log(`No existe ningun producto con el Id: ${id}`);
                } else {
                    await fs.promises.writeFile(`./${this.ruta}.txt`, JSON.stringify(contenidoActualizado, null, 2));
                    console.log(`Producto ${id} elimiado`);
                }
            } else {
                console.log("No se puede eliminar ningun producto debido a que el archivo se encuentra vacio");
            }
        } catch (error) {
            return null;
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.ruta}.txt`, '[]', 'utf-8');
            console.log(`Los elementos fueron eliminados`);
        } catch (error) {
            return null;
        }
    }
    alAzar = (arregloDePoductos) => {
        try {
            let valorRamdon = Math.floor(Math.random() * arregloDePoductos.length);
             return valorRamdon;
        } catch (error) {
            console.log("error")
        }
    }

}


module.exports.Contenedor = Contenedor;
