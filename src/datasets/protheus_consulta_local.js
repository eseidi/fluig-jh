const campos = ['codigo', 'descricao'];
const display = campos;

function defineStructure() {
  for (let i = 0; i < campos.length; i++) {
    addColumn(campos[i]);
  }

  setKey(['codigo']);
  addIndex(['codigo']);
}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  /*$$ partials/varsProtheusSoap.js $$*/

  const dataset = DatasetBuilder.newDataset();
  const params = getConstraints(constraints);

  const sql =
    `SELECT NNR_CODIGO, NNR_DESCRI FROM NNR010 WHERE D_E_L_E_T_ = ''`;

  log.info(sql);

  const retorno = request.execquery(sql, empresa, filial, chave);
  var array = retorno.getCOLSFLD().getTABLEFIELDS();

  log.info("<<< ARRAY SIZE:" + array.size());

  if (array.size() > 0) {
    log.info("<<< POPULANDO DATASET");
    for (var i = 0; i < array.size(); i++) {
      dataset.addRow(new Array(array.get(i).getVALOR().getSTRING().get(0),
        array.get(i).getVALOR().getSTRING().get(1)
      ));
    }
  }

  return dataset;
}

/*$$ partials/getConstraintsParams.js $$*/
