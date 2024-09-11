const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "\n\t Digite sua Meta:"})

    if(meta.length == 0) {
        console.log('\n\t A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length == 0) {
        console.log("\n\t Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('\n\t Meta(s) marcadas como concluída(s)')

}


const start = async () => {
    while(true){
        
        const opcao = await select({
            message: "\n\t === MENU === >",
            choices: [
                {
                    name: "\n\t CADASTRAR META",
                    value: "cadastrar"
                },
                {
                    name: "\t LISTAR METAS",
                    value: "listar"
                },
                {
                    name: "\t SAIR",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log('\n\t ==== ATÉ A PRÓXIMA! ====')
                return
        }
    }
}

start();