USE CAC_TST

SELECT C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE,USR_FCRMVI_NROCER 'CERTIFICADO NRO.',
CAST(SUM (VTRMVI_PRENAC * VTRMVI_CANTID) AS INT) AS TOTALFACT
FROM VTRMVI A
INNER JOIN STMPDH B
ON A.VTRMVI_ARTCOD = B.STMPDH_ARTCOD
INNER JOIN VTRMVH C
ON C.VTRMVH_NROFOR = A.VTRMVI_NROFOR
INNER JOIN FCRMVI D
ON C.VTRMVH_NROFOR = D.FCRMVI_NROFOR
INNER JOIN VTMCLH E
ON E.VTMCLH_NROCTA = C.VTRMVH_NROCTA
WHERE VTRMVI_CODEMP = 'CAC01'
AND VTRMVI_CODFOR IN ('FC0002', 'FC0003')
AND VTRMVI_TIPPRO =  'VISAC'
AND VTRMVH_SUCURS=0002
AND VTRMVH_FCHMOV >= DATEADD(day, -15, getdate())
AND C.VTRMVH_CODFOR = A.VTRMVI_CODFOR
AND A.VTRMVI_NROITM = D.FCRMVI_NROITM
GROUP BY  VTRMVI_CODFOR, C.VTRMVH_NROFOR, VTRMVH_FECMOD, E.VTMCLH_NROCTA, E.VTMCLH_NOMBRE, VTRMVI_ARTCOD, STMPDH_DESCRP,  USR_FCRMVI_NROCER, D.FCRMVI_NROITM, VTRMVI_PRENAC,  VTRMVI_CANTID, (VTRMVI_PRENAC * VTRMVI_CANTID)
ORDER BY VTRMVH_NROFOR


insert into CONT_VISAC.dbo.Trx_visac (NroFact, Nombre, Fecha, NroCert, Importe, Estado)
select top 5 C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE,USR_FCRMVI_NROCER 'CERTIFICADO NRO.',
CAST(SUM (VTRMVI_PRENAC * VTRMVI_CANTID) AS INT) AS TOTALFACT
FROM VTRMVI A
INNER JOIN STMPDH B
ON A.VTRMVI_ARTCOD = B.STMPDH_ARTCOD
INNER JOIN VTRMVH C
ON C.VTRMVH_NROFOR = A.VTRMVI_NROFOR
INNER JOIN FCRMVI D
ON C.VTRMVH_NROFOR = D.FCRMVI_NROFOR
INNER JOIN VTMCLH E
ON E.VTMCLH_NROCTA = C.VTRMVH_NROCTA
WHERE VTRMVI_CODEMP = 'CAC01'
AND VTRMVI_CODFOR IN ('FC0002', 'FC0003')
AND VTRMVI_TIPPRO =  'VISAC'
AND VTRMVH_SUCURS=0002
AND VTRMVH_FCHMOV >= DATEADD(day, -15, getdate())
AND C.VTRMVH_CODFOR = A.VTRMVI_CODFOR
AND A.VTRMVI_NROITM = D.FCRMVI_NROITM
left join CONT_VISAC.dbo.Trx_visac on (CONT_VISAC.dbo.Trx_visac.Numero=CAC_TST.dbo.VTRMVH.VTRMVH_NROFOR)
where CONT_VISAC.dbo.Trx_visac.Numero is null
GROUP BY  VTRMVI_CODFOR, C.VTRMVH_NROFOR, VTRMVH_FECMOD, E.VTMCLH_NROCTA, E.VTMCLH_NOMBRE, VTRMVI_ARTCOD, STMPDH_DESCRP,  USR_FCRMVI_NROCER, D.FCRMVI_NROITM, VTRMVI_PRENAC,  VTRMVI_CANTID, (VTRMVI_PRENAC * VTRMVI_CANTID)
ORDER BY VTRMVH_NROFOR

-------------------------------------------------------------------------------------------------------------

insert into CONT_VISAC.dbo.Trx_visac (NroFact, Fecha, Nombre,  NroCert, Importe)
select top 6 C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE,USR_FCRMVI_NROCER 'CERTIFICADO NRO.',
CAST(SUM (VTRMVI_PRENAC * VTRMVI_CANTID) AS INT) AS TOTALFACT
FROM VTRMVI A
INNER JOIN STMPDH B
ON A.VTRMVI_ARTCOD = B.STMPDH_ARTCOD
INNER JOIN VTRMVH C
ON C.VTRMVH_NROFOR = A.VTRMVI_NROFOR
INNER JOIN FCRMVI D
ON C.VTRMVH_NROFOR = D.FCRMVI_NROFOR
INNER JOIN VTMCLH E
ON E.VTMCLH_NROCTA = C.VTRMVH_NROCTA
left join CONT_VISAC.dbo.Trx_visac on (CONT_VISAC.dbo.Trx_visac.NroFact = C.VTRMVH_NROFOR)
WHERE VTRMVI_CODEMP = 'CAC01'
AND VTRMVI_CODFOR IN ('FC0002', 'FC0003')
AND VTRMVI_TIPPRO =  'VISAC'
AND VTRMVH_SUCURS=0002
AND VTRMVH_FCHMOV >= DATEADD(day, -15, getdate())
AND C.VTRMVH_CODFOR = A.VTRMVI_CODFOR
AND A.VTRMVI_NROITM = D.FCRMVI_NROITM
AND CONT_VISAC.dbo.Trx_visac.NroFact is null
GROUP BY  VTRMVI_CODFOR, C.VTRMVH_NROFOR, VTRMVH_FECMOD, E.VTMCLH_NROCTA, E.VTMCLH_NOMBRE, VTRMVI_ARTCOD, STMPDH_DESCRP,  USR_FCRMVI_NROCER, D.FCRMVI_NROITM, VTRMVI_PRENAC,  VTRMVI_CANTID, (VTRMVI_PRENAC * VTRMVI_CANTID)
ORDER BY VTRMVH_NROFOR

-------------------------------------------------------------------------------------------------------------

SELECT DISTINCT C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE,
CAST(SUM(VTRMVI_CANTID) AS INT) AS cantXprod,
CAST(SUM (VTRMVI_PRENAC * VTRMVI_CANTID) AS INT) AS totXprod
FROM VTRMVI A
INNER JOIN STMPDH B
ON A.VTRMVI_ARTCOD = B.STMPDH_ARTCOD
INNER JOIN VTRMVH C
ON C.VTRMVH_NROFOR = A.VTRMVI_NROFOR
INNER JOIN FCRMVI D
ON C.VTRMVH_NROFOR = D.FCRMVI_NROFOR
INNER JOIN VTMCLH E
ON E.VTMCLH_NROCTA = C.VTRMVH_NROCTA
WHERE VTRMVI_CODEMP = 'CAC01'
AND VTRMVI_CODFOR IN ('FC0002', 'FC0003')
AND VTRMVI_TIPPRO =  'VISAC'
AND VTRMVH_SUCURS=0002
AND VTRMVH_FCHMOV >= DATEADD(day, -15, getdate())
AND C.VTRMVH_CODFOR = A.VTRMVI_CODFOR
--AND USR_FCRMVI_NROCER !=''
GROUP BY  C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE, STMPDH_DESCRP,VTRMVI_CANTID
ORDER BY VTRMVH_NROFOR

-------------------------------------------------------------------------------------------
--POSTA FUNCIONA.

INSERT INTO CONT_VISAC.dbo.Trx_Visac1 (NroFact, Fecha, Nombre, CantCert, ImpTotal)
SELECT DISTINCT top 2 C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE,
CAST(SUM(VTRMVI_CANTID) AS INT) AS cantXprod,
CAST(SUM (VTRMVI_PRENAC * VTRMVI_CANTID) AS INT) AS totXprod
FROM VTRMVI A
INNER JOIN STMPDH B
ON A.VTRMVI_ARTCOD = B.STMPDH_ARTCOD
INNER JOIN VTRMVH C
ON C.VTRMVH_NROFOR = A.VTRMVI_NROFOR
INNER JOIN FCRMVI D
ON C.VTRMVH_NROFOR = D.FCRMVI_NROFOR
INNER JOIN VTMCLH E
ON E.VTMCLH_NROCTA = C.VTRMVH_NROCTA
left join CONT_VISAC.dbo.Trx_Visac1 on (CONT_VISAC.dbo.Trx_Visac1.NroFact = C.VTRMVH_NROFOR)
WHERE VTRMVI_CODEMP = 'CAC01'
AND VTRMVI_CODFOR IN ('FC0002', 'FC0003')
AND VTRMVI_TIPPRO =  'VISAC'
AND VTRMVH_SUCURS=0002
AND VTRMVH_FCHMOV >= DATEADD(day, -15, getdate())
AND C.VTRMVH_CODFOR = A.VTRMVI_CODFOR
AND CONT_VISAC.dbo.Trx_Visac1.NroFact is null
--AND USR_FCRMVI_NROCER !=''
GROUP BY  C.VTRMVH_NROFOR, VTRMVH_FECMOD,E.VTMCLH_NOMBRE, STMPDH_DESCRP,VTRMVI_CANTID
ORDER BY VTRMVH_NROFOR DESC