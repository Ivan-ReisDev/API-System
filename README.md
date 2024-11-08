# Endpoint de Atualização de Usuários (`/users`)

Este endpoint permite atualizar diferentes informações de um usuário. Ele utiliza o caso de uso `UsersUpdateUserUseCase` para validar e executar operações de atualização com base no tipo de atualização especificado no corpo da requisição.

## URL

```http
POST /users
Estrutura da Requisição
Headers
Campo	Tipo	Obrigatório	Descrição
Content-Type	string	Sim	Tipo de conteúdo, deve ser application/json
Body
O corpo da requisição deve conter um JSON com as informações necessárias para a atualização. A estrutura do JSON varia conforme o tipo de atualização.

Campos Comuns
Campo	Tipo	Obrigatório	Descrição
type	string	Sim	Tipo da atualização. Valores permitidos: "account.update.status", "account.update.tag", "account.update.team", "account.update.requirements", "account.update.admins"
id	string	Condicional	ID do usuário. Necessário para atualizações de equipe e admins.
nickname	string	Condicional	Nickname do usuário. Necessário para atualizações de status e requisitos.
...	...	...	Campos adicionais específicos por tipo (veja abaixo).
Exemplos de Body por Tipo de Atualização
Atualização de Status (account.update.status)
Usado para atualizar o status de um usuário com base em um código de ativação.

json
Copiar código
{
    "type": "account.update.status",
    "nickname": "usuarioTeste",
    "codeActive": "12345",
    "password": "senhaSegura"
}
Atualização de Tag (account.update.tag)
Usado para criar ou atualizar a tag de um usuário.

json
Copiar código
{
    "type": "account.update.tag",
    "id": "user_id_aqui",
    "tag": "TAG"
}
Atualização de Equipe (account.update.team)
Usado para atualizar as equipes às quais o usuário pertence. Exige permissões de administrador ou diretor.

json
Copiar código
{
    "type": "account.update.team",
    "id": "user_id_aqui",
    "teams": ["equipe1", "equipe2"],
    "user": {
        "userType": "Admin"
    }
}
Atualização de Requisitos (account.update.requirements)
Usado para atualizar informações de requisitos, como patente, código e avisos.

json
Copiar código
{
    "type": "account.update.requirements",
    "nickname": "usuarioTeste",
    "patent": "NovaPatente",
    "code": "codigoNovo",
    "warnings": 1
}
Atualização de Administrador/Diretor (account.update.admins)
Usado para atualizar dados de um usuário que tenha permissões de administrador ou diretor.

json
Copiar código
{
    "type": "account.update.admins",
    "id": "user_id_aqui",
    "nickname": "novoNickname",
    "password": "novaSenha",
    "userType": "Admin"
}
Respostas
Sucesso
Em caso de sucesso, o endpoint retorna um código de status 200 e um boolean indicando a atualização:

json
Copiar código
true
Erro
Em caso de erro, o endpoint retorna um código de status e um objeto IError com uma mensagem e o código de status HTTP.

Exemplo de erro:

json
Copiar código
{
    "error": "Ops! Usuário não encontrado",
    "status": 404
}
Tratamento de Erros
O endpoint lida com os seguintes erros:

400 – Erro de validação nos dados da requisição (ex.: campo obrigatório ausente).
404 – Usuário ou recurso não encontrado.
403 – Permissão insuficiente para realizar a operação.
500 – Erro interno do servidor ou erro inesperado.
Exemplo de Uso com cURL
Aqui está um exemplo de requisição usando cURL para atualizar o status de um usuário:

bash
Copiar código
curl -X POST https://api.seusite.com/users/update \
     -H "Content-Type: application/json" \
     -d '{
           "type": "account.update.status",
           "nickname": "usuarioTeste",
           "codeActive": "12345",
           "password": "senhaSegura"
         }'
Esse comando envia uma requisição para atualizar o status do usuário com os dados especificados. Substitua "https://api.seusite.com" pelo URL da sua API.

