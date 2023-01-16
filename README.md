

#### 1) Frontend

Este código é um aplicativo React que fornece uma função de pesquisa. O aplicativo importa as dependências necessárias e usa React Hooks para gerenciar o estado do aplicativo. A função handleSearch é chamada quando o usuário clica no botão de pesquisa, faz várias solicitações de busca para diferentes terminais no servidor localhost para obter vendas, compras, equipamentos, força de trabalho e dados de materiais com base no texto de pesquisa inserido pelo usuário. Os dados são então armazenados nas respectivas variáveis ​​de estado e passados ​​para os componentes filhos SalesCard, PurchaseCard, EquipmentsCard, WorkforceCard e MaterialsCard para serem exibidos. O aplicativo também inclui estados de erro e carregamento.
#### 2) Backend

Esse código é um aplicativo do lado do servidor construído com Node.js e a estrutura Express. O aplicativo começa importando as dependências necessárias, o Express para lidar com o roteamento e o middleware e os cors para lidar com o compartilhamento de recursos entre origens. O aplicativo usa o módulo fs para ler dados de arquivos json. O aplicativo cria um aplicativo expresso e habilita o CORS para todas as rotas.

O aplicativo define várias rotas para lidar com diferentes pontos de extremidade, por exemplo, a rota '/purchaseOrders' retornará dados de ordem de compra do arquivo purchase_orders.json. A aplicação também possui uma rota '/search' que recebe um texto de pesquisa como parâmetro de consulta e retorna o resultado da pesquisa em todas as tabelas (equipamentos, materiais, pedidos_de_compra, pedidos_de_vendas, força de trabalho). Os resultados são filtrados para remover quaisquer valores vazios e retornados como um objeto JSON.

O aplicativo está configurado para escutar na porta 3333 e enviará uma mensagem para o console quando for iniciado.

