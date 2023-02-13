import {promises as fs} from 'fs'

  export default class ProductManager {
    constructor() {
        this.path = './productos.txt'
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title, 
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        };
        this.products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse (respuesta)
    }
    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
       return  console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let filter = respuesta3.find(product => product.id === id)
        if(!respuesta3.find(product => product.id === id)){
            console.log("producto no encontrado")
        }else{
            console.log(filter)
        }
       

    };

   deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile(this.path, JSON.stringify(productFilter));
    console.log("producto eliminado")
   };

   updateProducts = async ({id, ...producto}) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts()
    let productsModif = [
        {...producto, id},
        ...productOld
    ]
    await fs.writeFile(this.path, JSON.stringify(productsModif ));

   };
}


const productos = new ProductManager

/*productos.addProduct("titulo1", "Descripcion1", 1000, "imagen1", "abc121", 1)
productos.addProduct("titulo2", "Descripcion2", 2000, "imagen2", "abc122", 2)
productos.addProduct("titulo3", "Descripcion3", 3000, "imagen3", "abc123", 3)
productos.addProduct("titulo4", "Descripcion4", 4000, "imagen4", "abc124", 4)
productos.addProduct("titulo5", "Descripcion5", 5000, "imagen5", "abc125", 5)
productos.addProduct("titulo6", "Descripcion6", 6000, "imagen6", "abc126", 6)
productos.addProduct("titulo7", "Descripcion7", 7000, "imagen7", "abc127", 5)
productos.addProduct("titulo8", "Descripcion8", 8000, "imagen8", "abc128", 4)
productos.addProduct("titulo9", "Descripcion9", 9000, "imagen9", "abc129", 3)
productos.addProduct("titulo10", "Descripcion10",10000, "imagen10", "abc120", 2)*/


//productos.getProducts();

//productos.getProductsById(2)
//productos.deleteProductsById(2)

/*productos.updateProducts({
    title: 'Titulo3',
    description: 'alsdkjasldkj',
    price: 3000,
    imagen: "imagen3",
    code: "abcde123",
    stock: 15,
    id: 3
})*/