// Variables globales para mantener el estado de la aplicación
let isAdmin = false;
const productos = {
    zona1: [],
    zona2: [],
    zona3: [],
    zona4: [],
};

// Función para iniciar sesión
document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validar credenciales (puedes ajustar esto según tus necesidades)
    if (username === "admin" && password === "admin") {
        isAdmin = true;
        console.log("Inició sesión como admin.");
    } else if (username === "vendedor" && password === "vendedor") {
        isAdmin = false;
        console.log("Inició sesión como vendedor.");
    } else {
        alert("Credenciales incorrectas.");
        console.log("Credenciales incorrectas.");
        return;
    }

    // Mostrar la aplicación y ocultar el formulario de inicio de sesión
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
});

// Función para registrar productos
document.getElementById("registerButton").addEventListener("click", function () {
    if (!isAdmin && (productos.zona1.length + productos.zona2.length + productos.zona3.length) >= 50) {
        alert("No puedes registrar más productos en las zonas 1, 2 y 3.");
        return;
    }

    const productName = document.getElementById("productName").value;
    const productReference = document.getElementById("productReference").value;
    const productQuantity = parseInt(document.getElementById("productQuantity").value);
    const productValue = parseInt(document.getElementById("productValue").value);
    const productDescription = document.getElementById("productDescription").value;

    let zona;

    if (isAdmin) {
        zona = document.querySelector('input[name="zona"]:checked').value; // Obtiene la zona seleccionada
    } else {
        zona = document.querySelector('input[name="zona"]:checked').value; // Obtiene la zona seleccionada por el vendedor
    }

    const producto = {
        nombre: productName,
        referencia: productReference,
        cantidad: productQuantity,
        valor: productValue,
        descripcion: productDescription,
    };

    productos[`zona${zona}`].push(producto);
    updateProductList();
});

// Función para actualizar la lista de productos
function updateProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    for (let zona = 1; zona <= 4; zona++) {
        const zonaName = getZonaName(zona);
        productList.innerHTML += `<h3>${zonaName}</h3>`;

        if (productos[`zona${zona}`].length === 0) {
            productList.innerHTML += "<p>No hay productos en esta zona.</p>";
        } else {
            productList.innerHTML += "<ul>";
            for (const product of productos[`zona${zona}`]) {
                productList.innerHTML += `<li>${product.nombre} - ${product.cantidad} unidades</li>`;
            }
            productList.innerHTML += "</ul>";
        }
    }

    // Actualizar las cantidades de productos por zona
    updateProductCounts();
}

// Función para obtener el nombre de la zona
function getZonaName(zona) {
    switch (zona) {
        case 1:
            return "Productos malos";
        case 2:
            return "Productos varios";
        case 3:
            return "Productos de hogar";
        case 4:
            return "Productos tecnológicos";
    }
}

// Función para actualizar la cantidad de productos por zona
function updateProductCounts() {
    const productCounts = document.getElementById("productCounts");
    productCounts.innerHTML = "<h2>Cantidad de Productos por Zona</h2>";
    
    for (let zona = 1; zona <= 4; zona++) {
        const zonaName = getZonaName(zona);
        const productCount = productos[`zona${zona}`].reduce((acc, product) => acc + product.cantidad, 0);
        productCounts.innerHTML += `<p>${zonaName}: ${productCount} unidades</p>`;
    }
}

// Función para cerrar sesión
document.getElementById("logoutButton").addEventListener("click", function () {
    isAdmin = false;
    document.getElementById("login").style.display = "block";
    document.getElementById("app").style.display = "none";
    clearLoginForm();
});

// Función para limpiar el formulario de registro de productos
function clearProductForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productReference").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productValue").value = "";
    document.getElementById("productDescription").value = "";
}

// Limpia el formulario de inicio de sesión
function clearLoginForm() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}