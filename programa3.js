class Vuelo{
    constructor(origen, destino, costoBase, impuestoPorcentaje){
        this.origen = origen 
        this.destino = destino
        this.costoBase = costoBase
        this.impuestoPorcentaje = impuestoPorcentaje
    }
    CalcularCostoTotal(){
        const costoTotal = this.costoBase*this.impuestoPorcentaje + this.costoBase
        return costoTotal

    }

}
class Pasajero{
    constructor(nombre, edad, Mascota){
        this.nombre = nombre
        this.edad = edad
        this.Mascota = Mascota

    }


}

class NodoVuelo {
    constructor() {
        this.valor = null;
        this.siguiente = null;
    }
}

class ListaVuelos {
    cabeza = null;
    
    insertar(vuelo) {
        const nuevoNodo = new NodoVuelo();
        nuevoNodo.valor = vuelo;

        //Pregunto si la lista está vacía
        if (this.cabeza == null) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoTmp = this.cabeza;
            while (nodoTmp.siguiente != null) {
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    mostrarTodosLosVuelos() {
        if (this.cabeza == null) {
            console.log(`No hay vuelos para mostrar, no hay nodos en la lista`);
        } else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while (nodoTmp != null) {
                console.log(`Datos del vuelo número ${i}`);
                console.log(`Origen: ${nodoTmp.valor.origen}, Destino: ${nodoTmp.valor.destino}`);
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
        }
    }
}

class Aerolinea {
    constructor(nombreAerolinea, costoDulces) {
        this.nombreAerolinea = nombreAerolinea;
        this.costoDulces = costoDulces;
        this.vuelos = new ListaVuelos();
        this.totalRecaudado = 0;
        this.destinosPreferidos = {};
        this.totalMascotasRecaudado = 0;
        this.infantesViajando = 0;
        this.costoTotalDulces = 0;
    }

    agregarVuelo(vuelo) {
        this.vuelos.insertar(vuelo);
    }

    reservarVuelo(vuelo, pasajero) {
        this.totalRecaudado += vuelo.CalcularCostoTotal();
        if (this.destinosPreferidos[vuelo.destino] == null) {
            this.destinosPreferidos[vuelo.destino] = 0;
        }
        this.destinosPreferidos[vuelo.destino] += 1;
        if (pasajero.Mascota != null) {
            this.totalMascotasRecaudado += vuelo.CalcularCostoTotal() * pasajero.Mascota['impuestoPorcentaje'];
        }
        if (pasajero.edad <= 12) {
            this.infantesViajando += 1;
            this.costoTotalDulces += this.costoDulces;
        }
    }

    calcularImpuestosPorDestino(destino) {
        let totalImpuestos = 0;
        let nodoTmp = this.vuelos.cabeza;
        while (nodoTmp != null) {
            if (nodoTmp.valor.destino == destino) {
                totalImpuestos += nodoTmp.valor.costoBase * nodoTmp.valor.impuestoPorcentaje;
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return totalImpuestos;
    }

    mostrarDestinoPreferido() {
        let destinos = Object.keys(this.destinosPreferidos);
        let valorMaximo = 0;
        let destinosPreferidos = '';
    
        // Encuentra el valor máximo de los destinos 
        for (let i = 0; i < destinos.length; i++) {
            let destino = destinos[i];
            let valor = this.destinosPreferidos[destino];
            if (valor > valorMaximo) {
                valorMaximo = valor;
            }
        }
    
        // Agrega los destinos preferidos a la lista
        for (let i = 0; i < destinos.length; i++) {
            let destino = destinos[i];
            let valor = this.destinosPreferidos[destino];
            if (valor == valorMaximo) {
                destinosPreferidos += `${destino}, `;
            }
        }
    
        // Elimina la última coma y el espacio
        destinosPreferidos = destinosPreferidos.slice(0, -2);
        return destinosPreferidos;
    }
    
    
    
}
vuelo1 = new Vuelo('manizales', 'bogota', 100000, 0.15)
vuelo2 = new Vuelo('medellin','ibague',200000,0.12)
vuelo3 = new Vuelo('armenia','San Andrés',500000,0.17)

aerolinea1 = new Aerolinea('Avianca',200)
aerolinea1.agregarVuelo(vuelo1)
aerolinea1.agregarVuelo(vuelo2)
aerolinea1.agregarVuelo(vuelo3)

pasajero1 = new Pasajero('pedro',4,{nombre:'milo',impuestoPorcentaje: 0.02})
pasajero2 = new Pasajero('juan',25,null)
pasajero3 = new Pasajero('pepe',37,{nombre:'elgato',impuestoPorcentaje: 0.04})

aerolinea1.reservarVuelo(vuelo1, pasajero1)
aerolinea1.reservarVuelo(vuelo2, pasajero2)
aerolinea1.reservarVuelo(vuelo3, pasajero3)

console.log('1. Valor total recaudado por concepto de venta de tiquetes:', aerolinea1.totalRecaudado);
console.log('2. Destino preferido de las personas:',aerolinea1.mostrarDestinoPreferido() )
console.log('3. Dinero recaudado por concepto de transporte de mascotas:', aerolinea1.totalMascotasRecaudado);
console.log('4. Total de impuestos para San Andrés:', aerolinea1.calcularImpuestosPorDestino('San Andrés'));
console.log('5. Cantidad de infantes que han viajado:', aerolinea1.infantesViajando);
console.log('6. El costo de los dulces es: ',aerolinea1.costoTotalDulces)