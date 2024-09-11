const { select, input, checkbox } = require('@inquirer/prompts')

let meta ={
    value: "Tomar 3l de Agua por dia",
    checked: false
}
let metas = [ meta ]

const cadastrarMeta = async () => {

    const meta = await input({menssage:"Digite sua Meta"})
        if (meta.length == 0){
            console.log("A meta não pode está vazia. ")
            return
    }

    metas.push({
        value:meta, 
        checked: false
    })
}

const listarMeta = async () => {

    const respostas = await checkbox({
        message: "\n Use as setas para mudar de meta, e o espaço para marcar ou desmarcar e o ENTER par finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    if (respostas.length == 0){
        console.log("\n Nenhuma meta selecionada! ")
        return
    } 

    meta.forEach((meta2) => {
        meta2,checkbox = false
    })
    
    respostas.forEach((resposta) =>{
            const meta = metas.find((meta2) => {
                return meta2.value == resposta
            })

            meta.checked = true
    })

    console.log ("Metas(s) marcadas concluidas (s)")
}

const start = async () => {

    while (true) {
        const opcao = await select({
            menssage: "\t ==== Menu ==== \n",
            choices: [{
                name: "CADASTRAR METAS",
                value: "cadastrar"
            },
            {
                name: "LISTAR METAS",
                value: "listar"
            },
            {
                name: "SAIR",
                value: "sair"
            }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMeta()
                console.log(respostas)
                break
            case "sair":
                console.log("\t==== ATÉ A PRÓXIMA ====\n")
                return
        }
    }
}

start()