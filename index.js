const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

    //Opçao Cadastrar Metas
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

    //Opçao Listar Metas
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("\n\t Nenhuma meta selecionada!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('\n\t Meta(s) marcadas como concluída(s)')

}

    //Opçao Metas Realizadas

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0){
        console.log("\n\t Não existem metas Realizadas ainda!")
        return
    }
    await select({
        message:"\n\t Metas Realizadas: " + realizadas.length,
        choices:[...realizadas]
    })
}
    //Opçao Metas Abertas
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        console.log("\n\t Não existem metas em aberto !")
        return
    }
    await select({
        message:"\n\t Metas Abertas: " + abertas.length,
        choices:[...abertas]
    })
}

   //Opçao Deletar Metas
   const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checkbox: false}
    })
    const itemsADeletar = await checkbox({
        message: "Selecione um item para ser deletado",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0){
        console.log("\n\t Nenhum item para ser deletado !")
        return
    }

    itemsADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
        console.log( "\n\t Metas(s) deletadas com sucesso !")
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
                    name: "\t METAS REALIZADAS",
                    value: "realizadas"
                },
                {
                    name: "\t METAS ABERTAS",
                    value: "abertas"
                },
                {
                    name: "\t DELETAR METAS",
                    value: "deletar"
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
            case "realizadas":
                await metasRealizadas ()             
                break
            case "abertas":
                await metasAbertas ()             
                break
            case "deletar":
                await deletarMetas ()             
                break
            case "sair":
                console.log('\n\t ==== ATÉ A PRÓXIMA! ====')
                return
        }
    }
}

start();