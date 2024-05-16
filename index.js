function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";

}
function cpfValid(){
    let textValidation
    let cpfInput = document.getElementById("cpf").value
    let addResult = document.getElementById('addResult')
    const cpf = new cpfValidator(cpfInput);
    const validado = cpf.valida()
    if(validado){
        textValidation = "CPF Válido"
        addResult.innerHTML = '<p class="text-green-500 font-semibold">' + textValidation + '</p>';
    } else{
        textValidation = "CPF Inválido"
        addResult.innerHTML = '<p class="text-red-600 font-semibold">' + textValidation + '</p>';
    }
    return cpf
}


function cpfValidator (cpfNumber){
    Object.defineProperty(this, 'cpfLimpo', {
        get: function( ){
            return cpfNumber.replace(/\D+/g, '')   
        }
    });
}

cpfValidator.prototype.valida = function (){
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequence()) return false

    const cpfParcial = this.cpfLimpo.slice(0,-2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCPF = cpfParcial + digito1 + digito2;

    return novoCPF === this.cpfLimpo
}

cpfValidator.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressive = cpfArray.length + 1
    let total = cpfArray.reduce((ac, val)=>{
        ac += (regressive * Number(val));
        regressive --;
        return ac
    }, 0)
   const digito = 11 - (total % 11);
   return digito > 9 ? 0 : String(digito);
}   

cpfValidator.prototype.isSequence = function(){
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo ? true : false;
}