import { useState, useEffect, useCallback } from 'react'
import productService from '../services/product.service'
import '../styles/products.css'

function ProductsPage() {
    const [products, setProducts] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    })

    const [selectedProduct, setSelectedProduct] = useState(null)

    const [isCreateOpenModal, setIsCreateOpenModal] = useState(false)
    const [isViewOpenModal, setIsViewOpenModal] = useState(false)
    const [isEditOpenModal, setIsEditOpenModal] = useState(false)
   

    useEffect(()=> {
        const fetchProducts = async() => {
            try{
                const response = await productService.getAllProducts()
                setProducts(response.data.data)
            }catch(error){
                console.error('Error fetching products: ', error)
            }
        }
        fetchProducts()
    }, [])

    const loadProducts = useCallback( async () => {
        try{
            const response = await productService.getAllProducts()
            setProducts(response.data.data)
        }catch(error){
            console.error('Error fetching product', error)
        }
    }, [])

    const openCreateModal = () =>{
        setFormData({
            name: '',
            description: '',
            price: ''
        })
        setIsCreateOpenModal(true)
        setIsViewOpenModal(false)
        setIsEditOpenModal(false)
    }

    const openEditModal = (product) =>{
        setSelectedProduct(product)

        setFormData({
            name: product.name,
            description:  product.description,
            price: product.price
        })

        setIsCreateOpenModal(false)
        setIsViewOpenModal(false)
        setIsEditOpenModal(true)
    }

    const closeCreateModal = () =>{
        setIsCreateOpenModal(false)
    }

    const closeEditModal = () =>{
        setIsEditOpenModal(false)
    }

    const handleCreateProduct = (event) =>{
        const { name, value} = event.target

        setFormData((prevData) => ({
            ...prevData, 
            [name]: value
        }))
    }

    const handleUpdateProduct = (event) =>{
        const { name, value} = event.target

        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmitCreate = async (event) =>{
        event.preventDefault()

        await productService.createProduct({
            name: formData.name,
            description: formData.description,
            price: formData.price
        })
        closeCreateModal()
        await loadProducts()
    }

    const handleSubmitUpdate = async (event) =>{
        event.preventDefault()

        await productService.updateProduct(
            selectedProduct.productId,
            {
                name: formData.name,
                description: formData.description,
                price: formData.price
            }
        )
        closeEditModal()
        await loadProducts()
    }

    const handleDeleteProduct = async (productId) =>{
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product"
        )
        if(!confirmDelete){
            return
        }
        await productService.deleteProduct(productId)
        await loadProducts()
    }

  return (
        <section className="products-page">
            <header className="products-page-header">
                <h2 className="products-page-title">Products</h2>
                <button className="products-button products-button-primary" onClick={openCreateModal}>
                    Create Product
                </button>
            </header>

                        <div className="products-table-container">
                        <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="4">No products found</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="products-row-actions">
                                        <button className="products-button products-button-edit" onClick={() => openEditModal(product)}>Edit</button>
                                        <button className="products-button products-button-delete" onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>

            {isCreateOpenModal && (
                <div className="products-modal-backdrop">
                    <section className="products-modal" role="dialog" aria-modal="true" aria-labelledby="create-product-title">
                        <header className="products-modal-header">
                            <h3 id="create-product-title">Create Product</h3>
                        </header>
                        <form className="products-form" onSubmit={handleSubmitCreate}>
                            <div className="products-form-field">
                                <label htmlFor="create-name">Name</label>
                                <input
                                    id="create-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleCreateProduct}
                                />
                            </div>
                            <div className="products-form-field">
                                <label htmlFor="create-description">Description</label>
                                <input
                                    id="create-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleCreateProduct}
                                />
                            </div>
                            <div className="products-form-field">
                                <label htmlFor="create-price">Price</label>
                                <input
                                    id="create-price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleCreateProduct}
                                />
                            </div>
                            <div className="products-form-actions">
                                <button className="products-button products-button-secondary" type="button" onClick={closeCreateModal}>Cancel</button>
                                <button className="products-button products-button-primary" type="submit">Save</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}

            {isEditOpenModal && (
                <div className="products-modal-backdrop">
                    <section className="products-modal" role="dialog" aria-modal="true" aria-labelledby="edit-product-title">
                        <header className="products-modal-header">
                            <h3 id="edit-product-title">Edit Product</h3>
                        </header>
                        <form className="products-form" onSubmit={handleSubmitUpdate}>
                            <div className="products-form-field">
                                <label htmlFor="edit-name">Name</label>
                                <input
                                    id="edit-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleUpdateProduct}
                                />
                            </div>
                            <div className="products-form-field">
                                <label htmlFor="edit-description">Description</label>
                                <input
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleUpdateProduct}
                                />
                            </div>
                            <div className="products-form-field">
                                <label htmlFor="edit-price">Price</label>
                                <input
                                    id="edit-price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleUpdateProduct}
                                />
                            </div>
                            <div className="products-form-actions">
                                <button className="products-button products-button-secondary" type="button" onClick={closeEditModal}>Cancel</button>
                                <button className="products-button products-button-primary" type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
    </section>
  );
}

export default ProductsPage;
