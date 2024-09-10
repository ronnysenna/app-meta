const start = () => {

    while(true){
        let opcao = "Sair"
            switch(opcao){
                case "Cadastrar":
                    console.log("Fazer o Cadastro")
                    break
                 case "Listar":
                    console.log("Listar cadastros")
                    break
                  case "Sair":
                    return
            }
    }
}

start()