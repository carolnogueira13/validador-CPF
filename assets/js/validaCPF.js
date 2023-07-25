class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfEnviado.replace(/\D+/g, ''),
            writable: false,
            enumerable: false,
            configurable: false
        });
    }

    // Retorna false para CPFs inválidos e true para CPFs válidos
    valida() {
        if (!this.cpfLimpo) return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo) return false;

        this.criaNovoCPF();
        return this.novoCpf === this.cpfLimpo;
    }

    criaNovoCPF() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2);
        const digito1 = this.criaDigito(cpfSemDigito);
        const digito2 = this.criaDigito(cpfSemDigito + digito1);
        this.novoCpf = cpfSemDigito + digito1 + digito2;
    }

    criaDigito(cpfSemDigito) {
        const cpfArray = Array.from(cpfSemDigito);
        let regressivo = cpfArray.length + 1;
        const resultado = cpfArray.reduce((ac, valor) => {
            ac += Number(valor) * regressivo;
            regressivo--;
            return ac;
        }, 0);
        const digito = 11 - (resultado % 11);
        return (digito <= 9) ? String(digito) : '0';
    }
}


const input = document.querySelector('.cpf');
const button = document.querySelector('.validar');
const resultado = document.querySelector('.resultado');


// Para quando apertar o enter, simular um clique no botão validar
input.addEventListener('keyup', (event) => {
    let tecla = event.which || event.keyCode;
    if (tecla == 13) button.click();
})


button.addEventListener('click', (e) => {
    const cpf = new ValidaCPF(input.value);
    resultado.innerHTML = "";
    const p = document.createElement('p');

    if (cpf.valida()) {
        p.classList.add('paragrafo-resultado-correto');
        p.innerHTML = "CPF válido";
    } else {
        p.classList.add('paragrafo-resultado-incorreto');
        p.innerHTML = "CPF inválido";
    }

    resultado.appendChild(p);
})


