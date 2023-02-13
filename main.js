class ProductManager {
    constructor () {
        this.products = []
    }
    static id = 0
    addProduct (title, description, price, image, code, stock) {
        for(let i = 0; i < this.products.length;i++){
            if(this.products[i].code === code) {
                console.log(`el codigo ${code} está repetido`);
                break;
            }
        }

        const newProduct = {
            title,
            description, price,
            image,
            code,
            stock,
            id:ProductManager.id
        }

        if(!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id: ProductManager.id,
            });
        }else{
            console.log("Todos los campos son requeridos")
        }
        
    }

    getProduct() {
        return this.products;
    }

    existe(id){
        return this.products.find((producto) => producto.id === id) 
    }

    getProductById(id){
        !this.existe(id) ? console.log("Not found") : console.log (this.existe(id));
        }
}


const productos = new ProductManager();


productos.addProduct('titulo1', 'descripcion', 1000, "imagen1", "abc123",5)
productos.addProduct('titulo1', 'descripcion', 1000, "imagen1", "abc123")

console.log(productos.getProduct());



//productos.getProductById(6);