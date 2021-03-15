class Despesa {
	constructor(nome,numerotel,data,valor,descricao) {
		this.nome = nome;
		this.numerotel = numerotel;
		this.data = data;
		this.valor = valor;
		this.descricao = descricao;
	}

	validarDados() {
		for (let i in this) {
			if (this[i] === null || this[i] === undefined || this[i] === '') {
				return false
			}
		}
		return true
	}
}

class Bd {
	constructor() {
		let id = localStorage.id;

		if (id === null) {
			localStorage.id = 0;
		}
	}

	getProximoId() {
		let id = localStorage.id;
		return parseInt(id) + 1;
	}

	gravar(d) {
		let id = this.getProximoId();
		localStorage.setItem(id, JSON.stringify(d));
		localStorage.setItem('id', id);
	}

	listarDespesas() {
		let id = localStorage.id;
		let despesas = [];

		for (var i = 0; i <= id; i++) {
			let despesa = JSON.parse(localStorage.i);

			if (despesa === null) {
				continue;
			}
			despesa.id = i;
			despesas.push(despesa);
		}

		return despesas
	}

	pesquisar(despesa) {
		let despesasFiltradas = [];
		despesasFiltradas = this.listarDespesas();

		//nome
		if (despesa.nome != '') {
			console.log('filtro nome');
			despesasFiltradas = despesasFiltradas.filter(d => d.nome == despesa.nome);
		}
	
		//numero telefone
		if (despesa.numerotel != '') {
			console.log('filtro numerotel');
			despesasFiltradas = despesasFiltradas.filter(d => d.numerotel == despesa.numerotel);
		}

		//data
		if (despesa.data != '') {
			console.log('filtro data');
			despesasFiltradas = despesasFiltradas.filter(d => d.data == despesa.data);
		}

		//valor
		if (despesa.tipo != '') {
			console.log('filtro valor');
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
		}

		//descricao
		if (despesa.descricao != '') {
			console.log('filtro descricao');
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
		}

		return despesasFiltradas

	}

	deletar(id) {
		localStorage.removeItem(id);
	}
}

let bd = new Bd();

function cadastrarDespesa() {
	let nome = document.getElementById('nome');
	let numerotel = document.getElementById('numerotel');
	let data = document.getElementById('data');
	let valor = document.getElementById('valor');
	let descricao = document.getElementById('descricao');

	let despesa = new Despesa(nome.value, numerotel.value, data.value, valor.value, descricao.value);

	if(despesa.validarDados()) {
		bd.gravar(despesa);
		alert('Sucesso');

		nome.value = '';
		numerotel.value = '';
		data.value = '';
		valor.value = '';
		descricao.value = '';
	} else {
		alert('erro');
	}	
}

function carregarDespesas(despesas = [], filtro = false) {
	// alert('q')
	if (despesas.length == 0 && filtro == false) {
		despesas = bd.listarDespesas()	
	}

	let listaDespesas = document.getElementById('listaDespesas');
	listaDespesas.innerHTML = '';
	
	despesas.forEach(function(d){

		let linha = listaDespesas.insertRow();

		linha.insertCell(0).innerHTML = d.id;
		linha.insertCell(1).innerHTML = d.nome;
		linha.insertCell(2).innerHTML = d.data;
		linha.insertCell(3).innerHTML = d.valor;
		linha.insertCell(4).innerHTML = d.descricao;

		let btn = document.createElement('button');
		btn.className = 'btn btn-danger';
		btn.innerHTML = '<i class="bx bx-checkbox-square"></i>';
		btn.id = `id_despesa_${d.id}`;
		btn.onclick = function(){
			let id = btn.id.replace('id_despesa_','');
			bd.deletar(id)
			
		}

		linha.insertCell(5).append(btn)

	})

}

function pesquisarDespesa() {
	let nome = document.getElementById('nome').value;
	let numerotel = document.getElementById('numerotel').value;
	let data = document.getElementById('data').value;
	let valor = document.getElementById('valor').value;
	let descricao = document.getElementById('descricao').value;

	let despesa = new Despesa(nome,numerotel,data,valor,descricao);

	carregarDespesas(bd.pesquisar(despesa), true);
}

function totalDespesas(despesas = Array()) {
	
	let total = 0;
	let valorTotal = document.getElementById('valorTotal');

	let listaDespesas = document.getElementById('listaDespesas');
	listaDespesas.innerHTML = '';

	despesas.forEach(function(d){
		let linha = listaDespesas.insertRow();

		linha.insertCell(0).innerHTML = d.descricao;
		linha.insertCell(1).innerHTML = d.valor;

		total += parseFloat(d.valor);
	})

	valorTotal.innerHTML = `R$${total}`;
}

function filtrarTotalDespesas() {
	let nome = document.getElementById('nome');
	let data = document.getElementById('data');

	let despesa = new Despesa(nome, '', data, '', '');

	let despesasFiltradas = bd.pesquisar(despesa);

	totalDespesas(despesasFiltradas);

}



$(document).ready(function(){
    //modo noite e dia
    function toggleTheme() {
        if(localStorage.getItem("modo") !== null) {
            if(localStorage.modo === "dark") {
                $("body").addClass("dark");
            } else {
                $("body").removeClass("dark");                  
            }
        }
        updateIcon();
    }
    toggleTheme()

    $(".dia-e-noite").on("click", function() {
        $("body").toggleClass("dark");
        if($("body").hasClass("dark")) {
            localStorage.modo = "dark";
        } else {
            localStorage.modo = "light";
        }
        updateIcon();
    });

    function updateIcon() {
        if($("body").hasClass("dark")) {
            $("i.nt").removeClass("bx-moon");
            $("i.nt").addClass("bx-sun");
            document.getElementById("dn").innerHTML = "Modo Dia";
        } else {
            $("i.nt").removeClass("bx-sun");
            $("i.nt").addClass("bx-moon");
            document.getElementById("dn").innerHTML = "Modo Noite";
        }
    }
});
function getRandom(numero) {
    return Math.floor(Math.random()*numero);
}
// alert(getRandom(3333))
document.getElementById("usuarios").innerHTML = getRandom(100);
document.getElementById("erros").innerHTML = getRandom(2);