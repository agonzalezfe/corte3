class Laboratorio {
    constructor(nombre) {
        this.nombre = nombre;
        this.pacientes = [];
        this.pruebas_realizadas = new ListaPruebas();
    }

    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
    }

    realizarPrueba(paciente, prueba) {
        let valor_prueba = prueba.valor;
        if (paciente.sisben == 'A') {
            valor_prueba -= valor_prueba * prueba.descuento_sisben.A;
        } else if (paciente.sisben == 'B1') {
            valor_prueba -= valor_prueba * prueba.descuento_sisben.B1;
        } else if (paciente.sisben == 'B2') {
            valor_prueba -= valor_prueba * prueba.descuento_sisben.B2;
        } else {
            throw new Error('El valor de sisben debe ser "A", "B1" o "B2"');
        }
        if (paciente.salario > 1300000*3) {
            let minimos_adicionales = paciente.salario/1300000*3;
            valor_prueba += valor_prueba * 0.1 * minimos_adicionales;
        }

        this.pruebas_realizadas.insertar({ paciente: paciente, prueba: prueba, valor: valor_prueba });
    }

    calcularIngresosTotales() {
        let total = 0;
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            total += nodoTmp.valor.valor;
            nodoTmp = nodoTmp.siguiente;
        }
        return total;
    }

    calcularIngresosPorRegimen(regimen) {
        let total = 0;
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            if (nodoTmp.valor.paciente.sisben == regimen) {
                total += nodoTmp.valor.valor;
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return total;
    }

    obtenerTiposPruebasConIngresos() {
        let tiposPruebas = {};
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            const prueba = nodoTmp.valor;
            if (!tiposPruebas[prueba.prueba.tipo]) {
                tiposPruebas[prueba.prueba.tipo] = 0;
            }
            tiposPruebas[prueba.prueba.tipo] += prueba.valor;
            nodoTmp = nodoTmp.siguiente;
        }
        return tiposPruebas;
    }

    calcularDescuentosSisben(Sisben) {
        let totalDescuento = 0;
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            const prueba = nodoTmp.valor;
            if (prueba.paciente.sisben === Sisben) {
                let descuento = prueba.valor * prueba.prueba.descuento_sisben[Sisben];
                totalDescuento += descuento;
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return totalDescuento;
    }

    obtenerPromedioIngresos() {
        let totalIngresos = this.calcularIngresosTotales();
        let totalPruebas = 0;
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            totalPruebas++;
            nodoTmp = nodoTmp.siguiente;
        }
        let promedio = totalIngresos / totalPruebas;
        return promedio;
    }

    obtenerLaboratoriosPorEncimaPromedio() {
        let promedio = this.obtenerPromedioIngresos();
        let laboratoriosPorEncimaPromedio = [];
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            const prueba = nodoTmp.valor;
            if (prueba.valor > promedio) {
                laboratoriosPorEncimaPromedio.insertar(prueba.paciente.nombre);
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return laboratoriosPorEncimaPromedio;
    }

    obtenerLaboratoriosPorDebajoPromedio() {
        let promedio = this.obtenerPromedioIngresos();
        let laboratoriosPorDebajoPromedio = [];
        let nodoTmp = this.pruebas_realizadas.cabeza;
        while (nodoTmp != null) {
            const prueba = nodoTmp.valor;
            if (prueba.valor < promedio) {
                laboratoriosPorDebajoPromedio.insertar(prueba.paciente.nombre);
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return laboratoriosPorDebajoPromedio;
    }

    calcularIngresosPorRegimenB1() {
        return this.calcularIngresosPorRegimen("B1");
    }
}

class Paciente {
    constructor(nombre, edad, genero, sisben, salario) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.sisben = sisben;
        this.salario = salario;
    }
}

class Prueba {
    constructor(nombre, valor, descuento_sisben, tipo) {
        this.nombre = nombre;
        this.valor = valor;
        this.descuento_sisben = descuento_sisben;
        this.tipo = tipo;
    }
}

class NodoPrueba {
    constructor(valor = null) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class ListaPruebas {
    constructor() {
        this.cabeza = null;
    }

    insertar(prueba) {
        const nuevoNodo = new NodoPrueba(prueba);
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

    mostrarTodasLasPruebas() {
        if (this.cabeza == null) {
            console.log(`No hay pruebas para mostrar, no hay nodos en la lista`);
        } else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while (nodoTmp != null) {
                console.log(`Datos de la prueba numero ${i}`);
                console.log(`Numero: ${nodoTmp.valor.prueba.nombre}, Valor: ${nodoTmp.valor.valor}`);
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
        }
    }
}

// Ejemplo:
let laboratorio = new Laboratorio("Laboratorio ABC");

let prueba1 = new Prueba("Prueba de Sangre", 100, { A: 0.1, B1: 0.05, B2: 0.02 }, "Sangre");
let prueba2 = new Prueba("Prueba de ojos", 80, { A: 0.1, B1: 0.05, B2: 0.02 }, "Orina");

let paciente1 = new Paciente("Juancho", 22, 'm', "A", 10000000);
let paciente2 = new Paciente("Mariana", 27, 'f', "B1", 20000000);
let paciente3 = new Paciente("Pepe", 90, 'm', "A", 3000000);

laboratorio.agregarPaciente(paciente1);
laboratorio.agregarPaciente(paciente2);
laboratorio.agregarPaciente(paciente3);

laboratorio.realizarPrueba(paciente1, prueba1);
laboratorio.realizarPrueba(paciente2, prueba1);
laboratorio.realizarPrueba(paciente3, prueba2);

console.log("Ingresos totales:", laboratorio.calcularIngresosTotales());
console.log("Ingresos por regimen A:", laboratorio.calcularIngresosPorRegimen("A"));
console.log("Ingresos por regimen B1:", laboratorio.calcularIngresosPorRegimenB1());
console.log("Descuentos para nivel A:", laboratorio.calcularDescuentosSisben("A"));
console.log("Tipos de pruebas con ingresos:", laboratorio.obtenerTiposPruebasConIngresos());
console.log("Laboratorios por encima del promedio:", laboratorio.obtenerLaboratoriosPorEncimaPromedio());
console.log("Laboratorios por debajo del promedio:", laboratorio.obtenerLaboratoriosPorDebajoPromedio());
