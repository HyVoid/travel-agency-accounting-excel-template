[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Plantilla de Excel para la Contabilidad de Agencias de Viajes B2B (.xlsx) y Calculadora de Rentabilidad para Tour Operators — Rastreador de Liquidaciones Financieras para DMC | RT Vacations Balkan
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/cb659a58-4e78-464d-bcee-5b144d34575d" />


**La plantilla de Excel para la contabilidad de agencias de viajes B2B (`.xlsx`)** y la **calculadora web gratuita de rentabilidad para tour operators** están diseñadas específicamente para **empresas de gestión de destinos (DMCs)**, **tour operators receptivos** y **agencias de viajes mayoristas**. **RT Vacations Balkan** automatiza el **costeo de trabajos de tours por reserva**, el **análisis del margen bruto por PAX**, el **vencimiento de las cuentas por cobrar (AR) de clientes**, la **conciliación de las cuentas por pagar (AP) de proveedores locales**, la **liquidación multimoneda FX (`EUR`, `BAM`, `USD`)** y el **reporting mensual del P&L de la agencia de viajes y del flujo de caja operativo**, todo dentro de una única **hoja de cálculo de liquidaciones financieras de viajes** conectada, sin instalar software ERP de viajes pesado ni pagar suscripciones SaaS recurrentes.

Incluso con un pipeline completo de reservas grupales y una facturación récord, una **agencia de viajes B2B** o un **DMC receptivo** puede perder fácilmente el control financiero si no puede responder tres preguntas fundamentales de la **contabilidad de gestión de viajes**:

- **Costeo de tours y precisión del margen por PAX:** ¿Qué **tours grupales receptivos**, **paquetes FIT a medida** o **itinerarios MICE** generan realmente beneficio neto después de deducir las **listas de habitaciones de hoteles, el alquiler de autocares chárter, los guías turísticos multilingües autorizados, las comidas grupales en restaurantes, las entradas a parques nacionales y los costes de handling en tierra**?
- **Liquidación AR/AP B2B y exposición crediticia:** ¿Cuánto efectivo se ha cobrado realmente de los **mayoristas de viajes B2B extranjeros y los socios OTA**, y cuánto sigue pendiente de pago en **pasivos con proveedores locales de hospitalidad** antes de las fechas de release de los hoteles?
- **Flujo de caja real vs. beneficio devengado en papel:** ¿El negocio de viajes genera un **flujo de caja operativo neto** positivo, o simplemente acumula ingresos por facturas B2B sin cobrar mientras drena el capital de trabajo en **prepagos anticipados a proveedores**?

Este **kit de herramientas de gestión financiera para agencias de viajes** unifica los **registros maestros de reservas, las facturas de ventas B2B, las facturas de proveedores de servicios en tierra, los libros mayores de pagos divididos y los gastos fijos de oficina (SG&A)** en un **flujo de trabajo automatizado de P&L de tours y reporting de liquidez bancaria**.

*Sin registro de cuentas. Sin instalación de software. Pruebas financieras instantáneas en el navegador, combinadas con un libro de Microsoft Excel permanente y reutilizable para la contabilidad de viajes mensual recurrente.*

> **Empieza hoy a auditar los márgenes de tus tours y el flujo de caja de tu agencia:**
>
> Usa la calculadora interactiva del navegador para simulaciones instantáneas de costeo de tours y flujo de caja en una sola sesión. Para la contabilidad permanente de la empresa, la conciliación bancaria mensual y el control financiero multireserva, descarga el libro automatizado de Microsoft Excel.
>
> - 🌐 **[Lanza la calculadora sandbox web gratuita de rentabilidad y flujo de caja para tour operators (aplicación interactiva en el navegador)](https://hyvoid.github.io/travel-agency-accounting-excel-template/)** — *Entorno de pruebas en línea instantáneo para simular márgenes brutos por reserva, depósitos B2B divididos y vencimientos AR/AP sin instalar archivos.*
> - 📥 **[Descarga la plantilla reutilizable de Excel para la contabilidad y la liquidación financiera de agencias de viajes B2B (.xlsx)](https://theseusworkshop.com/l/qihgnj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=travel-agency-accounting-excel-template)** — *Libro de hojas de cálculo completo para uso sin conexión, impulsado por fórmulas nativas de Excel Dynamic Array (`XLOOKUP`, `FILTER`, `LET`) para una contabilidad de viajes mensual permanente.*

---

## Matriz central de contabilidad y seguimiento financiero para agencias de viajes: de los puntos de dolor a las soluciones automatizadas en Excel

En lugar de malabarear **hojas de costeo de tours** desconectadas, registros manuales de **pagos de listas de habitaciones de hoteles** y comprobaciones reactivas del **saldo bancario**, este marco mapea los **puntos de dolor financieros** de alta frecuencia de las agencias de viajes directamente con controles automatizados de hoja de cálculo:

| Punto de dolor financiero de viajes de alta frecuencia | Módulo contable objetivo y categoría de búsqueda | Cómo automatiza el control esta plantilla de Excel para agencias de viajes |
| :--- | :--- | :--- |
| **Márgenes de beneficio poco claros por tour y por PAX** | **Costeo de trabajos por nivel de reserva y calculadora de P&L de tours** | Deduc automáticamente las facturas directas de servicios en tierra (hoteles, autocares chárter, guías, comidas, entradas) de las facturas de ventas B2B para calcular en tiempo real el **beneficio bruto por reserva**, el **margen bruto (%)** y el **beneficio neto por pasajero (`PAX`)**. |
| **Pérdida de control de los depósitos parciales de clientes y los saldos vencidos** | **Rastreador de vencimiento y cobro de cuentas por cobrar (AR) de clientes B2B** | Registra los depósitos iniciales del 30% del tour, las transferencias a plazos divididas y los cobros del saldo final contra los registros padre de `Invoice ID`, marcando las **cuentas por cobrar B2B vencidas** y los próximos plazos de cobro crediticio. |
| **Fechas límite de hoteles incumplidas y proveedores en tierra sin pagar** | **Registro de cuentas por pagar (AP) de proveedores DMC y pasivos con proveedores** | Vincula las facturas de proveedores en tierra directamente al `Booking ID`, haciendo seguimiento de los prepagos parciales de hoteles, las **obligaciones de pago pendientes con proveedores locales** y las próximas fechas de vencimiento de liquidación con proveedores. |
| **Tours grupales rentables que provocan crisis repentinas de liquidez** | **Estado mensual de flujo de caja de la agencia de viajes y conciliador de liquidez** | Separa el beneficio contable devengado de los movimientos bancarios reales deduciendo estrictamente las **facturas de proveedores pagadas** y los **gastos de oficina pagados** del **efectivo realmente cobrado a clientes B2B**. |
| **Gastos fijos de la agencia que consumen los márgenes de los tours grupales** | **Panel de asignación del beneficio operativo neto (EBITDA) y de los gastos generales SG&A** | Deduc los costes operativos fijos mensuales de la agencia (alquiler de oficina, nómina del personal, stands en ferias de turismo B2B, comisiones bancarias) del beneficio bruto de los tours para revelar el verdadero **ingreso operativo neto**. |
| **Confianza ciega en compradores B2B de alto volumen y bajo margen** | **Analítica multidimensional de rentabilidad DMC (por destino, comprador y comercial)** | Clasifica los **destinos de viajes receptivos**, los **compradores mayoristas B2B extranjeros** y los **gestores comerciales de tours** por contribución al margen neto y **riesgo de cobro de deuda incobrable**, en lugar de por volumen bruto facturado. |

---

## Tutorial paso a paso: cómo configurar tu flujo de trabajo de contabilidad y costeo de tours B2B para agencias de viajes

Este **flujo de trabajo de contabilidad para tour operators B2B** está diseñado para una implantación rápida: configura una sola vez los parámetros financieros de tu agencia, registra los eventos de reservas y liquidaciones de forma cronológica, y deja que el **motor automatizado de matrices dinámicas de Excel** genere **estados de P&L de tours** y **calendarios de vencimiento AR/AP** en tiempo real.

### Paso 1: Configurar los tipos de cambio FX multimoneda y los parámetros de margen de la agencia
Abre el módulo de configuración global para definir tu **moneda base de reporting** (`EUR`, `BAM` o `USD`), los **tipos de conversión de divisas (`FX`) de referencia**, el **margen bruto objetivo del tour (%)**, el **umbral de aviso de vencimiento AR (días)** y los **presupuestos mensuales de ingresos y beneficios** de la agencia. Rellena las listas maestras de validación con los **clientes B2B extranjeros, los proveedores locales en tierra, los destinos de viaje, los tipos de paquetes turísticos y los comerciales**.
- 👉 *Pruébalo en vivo:* **[Configura reglas de moneda y de margen de ejemplo en el sandbox web gratuito de la calculadora de tours](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Paso 2: Registrar reservas receptivas confirmadas, facturas de ventas B2B y facturas de proveedores en tierra
Asigna un `Booking ID` único a cada tour grupal confirmado o expediente FIT, registrando el **comprador mayorista B2B, el itinerario del destino, las fechas de inicio y fin del viaje, el número de pasajeros que pagan (`PAX`) y el gestor comercial asignado**. Introduce las **facturas B2B de clientes emitidas** y las **facturas entrantes de hoteles, transporte y guías** mapeadas a ese mismo `Booking ID`. Al registrar un **depósito parcial de un cliente** o un **plazo de prepago de hotel**, añade una nueva fila en el **Registro de Liquidaciones de Pagos** en lugar de sobrescribir el importe original de la factura.
- 👉 *Pruébalo en vivo:* **[Simula el costeo de reservas y las entradas de depósitos divididos en la aplicación interactiva del navegador](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Paso 3: Auditar márgenes brutos de tours, vencimientos AR/AP y flujo de caja mensual
Abre el **motor de cálculo automatizado de reservas** para revisar el beneficio bruto por tour, las alertas de desviación respecto al margen objetivo, el beneficio por PAX, los saldos no cobrados de compradores y los pasivos no pagados con proveedores. Cambia al **panel ejecutivo de finanzas de viajes** para supervisar el consumo neto de caja mensual, la rentabilidad estacional por destino y la fiabilidad de pago de los compradores B2B.
- 👉 *Pruébalo en vivo:* **[Consulta en línea el panel ejecutivo de P&L y de vencimientos AR/AP del DMC](https://hyvoid.github.io/travel-agency-accounting-excel-template/)**

### Paso 4: Pasar de las pruebas web de una sola sesión a la contabilidad mensual reutilizable en Excel
Si bien el sandbox del navegador es ideal para simulaciones instantáneas de una sola sesión, las operaciones continuas de una agencia de viajes requieren almacenamiento persistente de datos. Descarga el **libro de Microsoft Excel reutilizable sin conexión (`.xlsx`)** para mantener registros de transacciones permanentes de varios meses, realizar conciliaciones bancarias semanales, actualizar la `Analysis Date` para el **seguimiento en vivo de facturas vencidas** y trasladar el `Reporting Year` entre ciclos fiscales.
- 👉 *Consigue el kit permanente:* **[Descarga el libro de Excel reutilizable de contabilidad para agencias de viajes B2B (.xlsx) para operaciones mensuales recurrentes](https://theseusworkshop.com/l/qihgnj?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=travel-agency-accounting-excel-template)**

---

## La lógica de negocio y la metodología: cómo resolver las trampas de flujo de caja y los puntos ciegos de beneficio de las agencias de viajes

*Escrito en lenguaje llano y sin tecnicismos para fundadores de agencias de viajes, planificadores de tours y gestores de operaciones de DMC sin formación contable formal.*

En toda la industria turística mundial, miles de propietarios de agencias de viajes muy trabajadores caen exactamente en la misma trampa comercial: **su calendario de salidas está reservado al 100%, su equipo de ventas celebra un volumen de reservas récord y, sin embargo, la cuenta bancaria de la empresa está constantemente vacía.**

Si alguna vez has terminado un mes ajetreado de temporada alta y te has preguntado: *"Vendimos €200,000 en tours—¿adónde se fue todo el efectivo?"*, estás experimentando la brecha estructural entre los **ingresos por ventas facturadas**, el **beneficio real del tour** y el **flujo de caja bancario real**.

```
[ Invoiced B2B Tour Sales ]  ≠  [ Real Tour Gross Profit ]  ≠  [ Actual Cash in Bank ]
   (What you billed)             (After land supplier bills)    (Collected receipts minus paid bills & rent)
```

Este kit de herramientas fue diseñado para eliminar **seis puntos ciegos comerciales ocultos** que llevan silenciosamente a la quiebra a agencias de viajes que de otro modo serían exitosas:

### 1. La "ilusión del primer nivel de ingresos" (por qué un alto volumen de reservas no significa que hayas ganado dinero)
- **El punto ciego:** Vender un tour grupal receptivo de 25 personas por los Balcanes a un socio mayorista extranjero por **€15,000** parece una gran victoria comercial. Los operadores sin formación financiera tratan instintivamente esos €15,000 como dinero ganado.
- **La realidad:** Antes de que tu agencia se quede con un solo euro, debes pagar los bloques de habitaciones de hoteles de 4 estrellas, los autocares chárter de larga distancia, el alojamiento de los conductores, los guías urbanos autorizados, las comidas grupales en restaurantes y las entradas a museos. Si esos **costes directos de servicios en tierra** suman **€13,200**, tu beneficio bruto real es de solo **€1,800 (12%)**—y eso es *antes* de pagar el alquiler de la oficina, el software o los salarios del personal.
- **Cómo lo resuelve el kit (*costeo de trabajos por nivel de reserva*):** Cada factura de hotel, recibo de autocar y honorario de guía se etiqueta con un `Booking ID` específico. El sistema deduce automáticamente todos los costes directos en tierra del precio de venta B2B, mostrándote el beneficio restante exacto de cada tour *antes* de que celebres la venta.

### 2. La trampa de la "quiebra rentable" (por qué el beneficio en papel no puede pagar a los proveedores locales)
- **El punto ciego:** Suponer que, mientras cada paquete turístico se fije con un margen de beneficio saludable del 20%, tu agencia de viajes no puede quedarse sin dinero.
- **La realidad:** En los viajes B2B y las operaciones DMC, **el momento del efectivo es la supervivencia**. Supón que un tour genera €2,500 de beneficio neto. Sin embargo, tu socio B2B extranjero solo transfiere un **depósito del 20% (€3,000)** al confirmar y paga el 80% restante 30 días *después* de que los viajeros regresen a casa. Mientras tanto, los hoteles resort locales y las empresas de autocares exigen un **prepago del 100% (€10,500)** 14 días antes de la llegada del grupo. Aunque el tour sea "rentable sobre el papel", crea un **déficit de caja inmediato de -€7,500** en tu cuenta bancaria. Multiplica eso por 12 grupos de temporada alta en julio, y una agencia rentable se congela por iliquidez.
- **Cómo lo resuelve el kit (*separación entre P&L devengado y liquidez de caja*):** El libro separa estrictamente el *"beneficio contable devengado"* del *"efectivo real en el banco"*. Al comparar los depósitos reales recibidos de clientes con las facturas reales pagadas a proveedores, te advierte de déficits de capital de trabajo semanas antes de que lleguen las fechas límite de los hoteles.

### 3. El error de la "distorsión del calendario" (confundir fechas de reserva, fechas de pago y fechas de viaje)
- **El punto ciego:** Registrar ingresos y costes puramente según el mes en que se teclea una factura o se produce una transferencia bancaria.
- **La realidad:** En el turismo, una sola reserva abarca varios meses: un comprador B2B confirma un grupo y paga un depósito en **enero**, tu agencia paga los prepagos de hotel en **mayo**, los pasajeros viajan realmente en **agosto** y el saldo final llega en **septiembre**. Si mezclas estas fechas en una hoja de cálculo básica, enero parece enormemente rentable, mayo parece una pérdida financiera catastrófica y agosto muestra márgenes distorsionados, lo que hace imposible juzgar qué temporadas de viaje funcionan realmente mejor.
- **Cómo lo resuelve el kit (*atribución de doble línea temporal*):** El motor de cálculo ancla el **P&L del tour (ingresos y costes directos)** al **mes real de viaje** para que la rentabilidad estacional sea 100% precisa, mientras rastrea simultáneamente el **flujo de caja** en la fecha exacta del calendario en que el dinero entra o sale de tu cuenta bancaria.

### 4. El caos de la "sobrescritura de pagos parciales" (perder la pista de auditoría de los depósitos divididos)
- **El punto ciego:** Cuando un cliente extranjero transfiere un depósito de €4,000 sobre una factura de €10,000, muchos contables de agencias simplemente hacen clic en la celda de Excel y cambian el importe de la factura de €10,000 a €6,000.
- **La realidad:** Dos meses después, cuando surge una disputa de facturación por comisiones bancarias pagadas de menos o por un segundo plazo, el historial original de la factura ha desaparecido. Nadie puede demostrar el valor original del contrato, cuándo llegaron los pagos parciales o qué facturas están legalmente vencidas.
- **Cómo lo resuelve el kit (*vencimiento AR/AP basado en libro mayor inmutable*):** Las facturas de ventas B2B originales y las facturas de proveedores nunca se sobrescriben. Cada depósito, plazo dividido o pago de saldo se registra como una transacción con marca de tiempo en el **Registro de Liquidaciones**, calculando automáticamente los saldos pendientes de pago y resaltando las cuentas vencidas.

### 5. La "fuga multimoneda FX" (erosión silenciosa del margen a través de las fronteras)
- **El punto ciego:** Cotizar a un tour operator estadounidense o británico en `USD`, cobrar las liquidaciones bancarias en `EUR` y pagar a los proveedores locales de hospitalidad de los Balcanes en `BAM` (marcos convertibles bosnios) usando cálculos mentales aproximados o tipos de cambio desactualizados.
- **La realidad:** Las diferencias de conversión de divisas sin cobertura y los tipos de cambio inconsistentes en las hojas de cálculo erosionan silenciosamente **entre el 2% y el 5% del margen neto de un tour operator**—a menudo borrando un tercio del beneficio real final de la agencia sin que nadie lo note.
- **Cómo lo resuelve el kit (*normalización FX a nivel de transacción*):** Cada factura, recibo y pago se registra en su moneda nativa de transacción y se normaliza automáticamente a la única moneda base de reporting de tu agencia, con soporte integrado para bloquear los tipos de cambio históricos en el día exacto de la liquidación.

### 6. El espejismo del "vendedor estrella y el cliente top" (recompensar volumen no cobrado o de bajo margen)
- **El punto ciego:** Pagar comisiones de ventas a los gestores de cuentas receptivos o conceder tarifas preferentes a los socios mayoristas B2B solo porque generan el mayor volumen bruto de reservas.
- **La realidad:** Tu comprador B2B de mayor volumen podría estar exigiendo fuertes descuentos que comprimen el margen bruto al 6%, mientras retrasa crónicamente los pagos finales 90 días. Mientras tanto, un socio de tamaño medio aporta márgenes del 22% y paga el 100% por adelantado. Recompensar el volumen bruto de ventas empuja a tu equipo a vender tours que drenan el efectivo de la empresa.
- **Cómo lo resuelve el kit (*analítica de contribución ajustada al riesgo*):** El panel ejecutivo evalúa lado a lado los **ingresos facturados**, el **margen bruto realizado** y la **exposición AR vencida no cobrada** por cliente, destino y comercial, mostrando a la dirección quién aporta realmente *efectivo rentable y cobrado* a la agencia.

---

## Problemas financieros comunes de las agencias de viajes resueltos: hojas de cálculo manuales vs. plantilla automatizada de liquidaciones B2B

| Área operativa de la agencia de viajes | Hojas de cálculo manuales frágiles y registros desconectados (sin esta herramienta) | Marco automatizado de rentabilidad y liquidación de tours B2B (con esta herramienta) |
| :--- | :--- | :--- |
| **Costeo de paquetes turísticos y margen por PAX** | Se celebra el volumen bruto de ventas sin deducir las **cifras reales de las listas de habitaciones de hoteles, las dietas de los conductores, los honorarios de guías y las entradas**. | Las facturas directas de servicios en tierra se mapean a registros específicos de `Booking ID`, calculando el **beneficio bruto exacto por reserva, el margen % y el beneficio por PAX**. |
| **Conciliación de depósitos B2B y saldos divididos** | Los depósitos parciales de tours, las transferencias internacionales y los saldos finales sobrescriben celdas estáticas, provocando **disputas de conciliación AR** con mayoristas extranjeros. | Cada cobro a clientes se registra en un libro mayor de pagos inmutable y se agrega contra su `Invoice ID` padre para un **vencimiento AR B2B** en tiempo real. |
| **Control AP de proveedores locales de hospitalidad** | Las fechas de release de hoteles y los prepagos de autocares quedan enterrados en hilos de correo electrónico, dejando a los equipos financieros ciegos ante las **próximas fechas límite de proveedores y los pasivos AP sin pagar**. | Las facturas de proveedores en tierra y los pagos parciales a proveedores se vinculan directamente a las reservas, generando **alertas automatizadas de pasivos AP por vencer y vencidos**. |
| **Capital de trabajo y flujo de caja en temporada alta** | La dirección equipara el margen devengado positivo del tour con la liquidez bancaria, provocando **crisis de caja al pagar los depósitos anticipados a proveedores en tierra**. | Los **cobros recibidos de clientes, los pagos desembolsados a proveedores y los gastos generales SG&A de oficina pagados** se concilian por separado del P&L devengado de reservas. |
| **Contabilidad multimoneda (`EUR`/`BAM`/`USD`)** | Las facturas en moneda extranjera y las facturas locales de proveedores se suman con tipos de cambio mentales inconsistentes, ocultando el **deslizamiento de conversión FX**. | Todas las entradas multimoneda se normalizan a una moneda base de reporting unificada con **bloqueo de tipos de cambio históricos a nivel de transacción**. |
| **Riesgo crediticio B2B y evaluación de comerciales** | Los socios extranjeros y los comerciales se juzgan puramente por el valor de reservas confirmado, ignorando la **dilución del margen y los morosos crónicos**. | Los paneles multidimensionales clasifican **destinos, compradores B2B y comerciales** por beneficio bruto neto junto con el **riesgo de cuentas por cobrar vencidas no pagadas**. |

---

## Para quién es esto: roles objetivo de la industria de viajes y casos de uso específicos de la plantilla

Este marco está diseñado para profesionales del turismo que buscan **plantillas de contabilidad para agencias de viajes** especializadas y sin hinchazón, **hojas de cálculo de mid-office para DMC** y **calculadoras de rentabilidad para tour operators**:

- **Empresas de gestión de destinos (DMCs) y tour operators receptivos (`Plantilla de costeo de tours DMC y liquidación con proveedores`):** Diseñado para equipos receptivos que coordinan tours grupales de varios días, servicios en tierra FIT y programas MICE, y que necesitan conciliar facturas mayoristas extranjeras con facturas locales fragmentadas de hoteles, transporte y guías.
- **Propietarios, fundadores y directores generales de agencias de viajes (`Panel ejecutivo de P&L y flujo de caja para agencias de viajes`):** Diseñado para la dirección de la agencia que busca un centro de mando en tiempo real para supervisar el margen operativo neto, la exposición de capital de trabajo, los umbrales de equilibrio por PAX y las desviaciones presupuestarias estacionales sin contratar un CFO a tiempo completo.
- **Contables, tenedores de libros y controladores financieros de agencias de viajes (`Rastreador Excel de vencimientos AR/AP y conciliación bancaria para agencias de viajes`):** Diseñado para el personal financiero de back-office que necesita libros mayores relacionales estructurados, vencimiento automatizado de facturas (`Current`, `Due Soon`, `Overdue`), seguimiento de pagos divididos y normalización multimoneda (`EUR`, `BAM`, `USD`).
- **Gerentes de ventas B2B, planificadores de tours y directores de producto (`Calculadora de márgenes para tour operators y rastreador de contribución de clientes`):** Ideal para equipos comerciales que auditan qué destinos de viaje, niveles de paquetes turísticos y compradores B2B extranjeros generan ingresos de alto margen cobrados a tiempo frente a la exposición a deuda incobrable.
- **Pequeñas y medianas empresas de viajes (pymes) y tour operators boutique (`Alternativa gratuita de software ERP y de contabilidad de mid-office para viajes`):** A la medida de las agencias en crecimiento que han superado las hojas de cálculo manuales desordenadas pero quieren evitar los sistemas ERP de viajes heredados de más de $500 al mes y el software complejo de contabilidad de doble entrada.

*Nota de alcance:* Este kit funciona como un **sistema de contabilidad de gestión operativa, costeo de trabajos de tours y control financiero AR/AP**. Complementa, en lugar de reemplazar, los portales gubernamentales de presentación de impuestos, las cajas registradoras fiscales o los libros mayores de auditoría certificados.

---

## Escenarios contables reales de viajes B2B y DMC: casos de uso operativos de cola larga

Para ilustrar cómo opera este **modelo de hoja de cálculo para agencias de viajes B2B** en los flujos de trabajo turísticos diarios, a continuación se muestran cuatro escenarios comerciales de alta frecuencia que gestiona de fábrica:

### Escenario 1: Costeo de tours grupales receptivos multipaís y liquidación FX multimoneda
Un **DMC receptivo de los Balcanes** opera un tour grupal multipaís de 10 días por Croacia, Bosnia y Herzegovina y Montenegro (incurriendo en facturas locales de proveedores en `EUR` y `BAM`) vendido a un tour operator mayorista norteamericano facturado en `USD`. El coordinador de operaciones usa el **motor de normalización multimoneda** para bloquear los tipos de cambio históricos en las fechas de los depósitos, vincular 14 facturas separadas de habitaciones de hotel, autocares chárter y parques nacionales a un único `Booking ID`, y verificar si el grupo completado alcanzó el **margen bruto objetivo del 18%** de la agencia.

### Escenario 2: Prepagos por fechas límite de hoteles de pretemporada vs. control crediticio de clientes B2B
Treinta días antes de las salidas grupales del pico de verano, los hoteles costeros locales exigen prepagos no reembolsables del 50% de las listas de habitaciones. Al filtrar el **Registro de Liquidaciones y Vencimientos AR/AP B2B**, el gerente general de la agencia detecta tres socios de viajes extranjeros cuyos depósitos iniciales del tour tienen 15 días de retraso, pausando de inmediato los pagos salientes a proveedores e iniciando un cobro crediticio dirigido antes de que el flujo de caja de la agencia se vuelva negativo.

### Escenario 3: Auditoría de rentabilidad de destinos y socios mayoristas tras la temporada
Durante las revisiones comerciales de fin de año, el Director de Ventas examina el **Panel de Rendimiento Multidimensional del DMC** y descubre que, si bien el *Socio Mayorista A* generó €150,000 en volumen bruto de reservas, los fuertes descuentos de tarifas y los pagos crónicamente tardíos produjeron solo un margen bruto del 8% y una alta exposición a deuda incobrable. Mientras tanto, el *Socio Mayorista B* generó €80,000 en reservas con un margen bruto del 24% y una liquidación 100% puntual, lo que remodeló directamente los contratos de cupos B2B y los niveles de comisión del próximo año.

### Escenario 4: Cobertura de gastos fijos y modelado del punto de equilibrio por PAX de una agencia de viajes boutique
Una agencia boutique de tours receptivos con €6,500 de gastos generales SG&A fijos mensuales (alquiler de oficina, suscripciones a sistemas GDS/de reservas, nómina del personal, marketing en ferias internacionales) usa el **Rastreador Mensual de Beneficio Operativo y Flujo de Caja** para calcular cuántos pasajeros que pagan (`PAX`) y cuántos dólares de margen bruto de tours se necesitan cada mes para cubrir los gastos fijos y alcanzar los presupuestos anuales de ingreso neto.

---

## Por qué construí este marco financiero de viajes B2B

En el turismo B2B, el volumen bruto de reservas se confunde frecuentemente con la salud real del negocio.

Considera un tour grupal receptivo vendido a un mayorista internacional de viajes por **€12,000**. En un registro de ventas básico, la reserva parece sólida. Una vez que el equipo de operaciones finaliza las listas de habitaciones de hoteles, los autocares chárter, los guías turísticos multilingües, las comidas grupales y las entradas a museos, los costes directos de servicios en tierra alcanzan **€10,200**, dejando **€1,800 de beneficio bruto (un margen bruto del 15%)**.

Sin embargo, el análisis del margen es solo la mitad de la ecuación. Si el comprador extranjero solo ha transferido **€6,000** en depósitos mientras tu agencia ya ha desembolsado **€8,000** en prepagos a proveedores, una reserva rentable drena activamente **€2,000** del capital de trabajo de tu empresa.

Construí **RT Vacations Balkan** en torno a un **razonamiento financiero productizado**: transformar hojas de costeo de tours desconectadas, carpetas manuales de facturas y comprobaciones reactivas del saldo bancario en un **modelo unificado de contabilidad de gestión para DMC**. Permite a los operadores de viajes detectar temprano la erosión del margen, imponer disciplina crediticia B2B, programar las liquidaciones con proveedores con precisión y escalar rutas de viajes rentables con confianza.

---

## Arquitectura técnica y especificaciones del libro de Excel

### Motor nativo de fórmulas de matrices dinámicas de Microsoft Excel
El libro `.xlsx` descargable funciona completamente con **funciones nativas modernas de matrices dinámicas de Microsoft Excel** (`FILTER`, `SUMIFS`, `XLOOKUP`, `LET`, `UNIQUE`). Requiere **cero macros VBA**, lo que evita ventanas emergentes de seguridad, fallos de compatibilidad multiplataforma y la corrupción frágil de fórmulas por arrastre de filas.

### Reglas de validación contable integradas y controles relacionales de errores
Para prevenir errores contables administrativos, la hoja de cálculo aplica estrictos **desplegables de validación de datos, comprobaciones relacionales de claves foráneas y banderas de auditoría de diagnóstico automatizadas**:

| Campo del libro mayor / Área de control | Regla de validación contable | Comportamiento de diagnóstico automatizado de la hoja de cálculo |
| :--- | :--- | :--- |
| `Booking ID` (Registro maestro) | Debe ser 100% único en todo el registro maestro de reservas. | Activa una alerta de diagnóstico inmediata de `Duplicate ID`. |
| `Booking Status` | Restringido a los estados estandarizados del ciclo de vida del tour (`Confirmed`, `Completed`, `Cancelled`). | Aplicado mediante validación de lista desplegable bloqueada. |
| `Travel Start & End Dates` | Deben ser fechas de calendario cronológicas válidas. | Marca formatos de fecha inválidos o rangos de viaje invertidos. |
| `Passenger Count (PAX)` | Debe ser un entero positivo que represente viajeros que pagan. | La validación de entrada bloquea valores negativos o texto. |
| `Customer Invoice → Booking ID` | La clave foránea relacional debe existir en el Registro Maestro de Reservas. | Activa la advertencia `Orphaned / Invalid Booking ID`. |
| `Supplier Bill → Booking ID` | La clave foránea relacional debe existir en el Registro Maestro de Reservas. | Activa la advertencia `Orphaned / Invalid Booking ID`. |
| `Transaction Currency` | Debe coincidir con un código de moneda ISO configurado (`EUR`, `BAM`, `USD`). | Controlado mediante un menú desplegable vinculado a la configuración. |
| `Exchange Rate (FX Override)` | Los tipos de cambio FX históricos manuales anulan la tabla global cuando se rellenan. | Los códigos de moneda no mapeados devuelven `0` para forzar la revisión. |
| `Customer Receipt → Invoice ID` | El registro de pago debe referenciar una factura de ventas B2B emitida válida. | Marca el error `Invalid Invoice Reference`. |
| `Supplier Payment → Bill ID` | El registro de pago debe referenciar una factura de proveedor registrada válida. | Marca el error `Invalid Vendor Bill Reference`. |
| `Settlement Currency Match` | La moneda del cobro/pago debe coincidir con la moneda de la factura o factura de proveedor padre. | Activa la advertencia de auditoría `Currency Mismatch`. |
| `Payment Transaction Amount` | Todos los cobros y desembolsos de efectivo se introducen como valores positivos. | Las entradas negativas activan una alerta de auditoría de transacciones. |
| `Settlement Balance Tolerance` | Las pequeñas diferencias de redondeo bancario dentro del umbral configurado se liquidan automáticamente. | Muestra el estado `Settled`, `Partial` u `Overpaid`. |
| `Invoice & Supplier Due Dates` | Evaluadas dinámicamente contra la `Analysis Date` definida por el usuario. | Resalta el estado de antigüedad `Overdue` o `Due Soon`. |
| `Booking Direct Cost Completeness` | Las reservas activas requieren facturas de costes de proveedores en tierra vinculadas. | Diagnostica `Missing Supplier Cost` (riesgo de margen inflado). |
| `Booking Revenue Completeness` | Las reservas activas requieren facturas de ventas B2B de clientes vinculadas. | Diagnostica `Missing Customer Invoice` (riesgo de tour sin facturar). |
| `Booking Gross Margin Threshold` | Evaluado contra el margen objetivo de la agencia y el suelo de beneficio cero. | Marca `Below Target Margin` o `Loss-Making Booking`. |
| `Operating Overhead Separation` | Los gastos SG&A de la agencia se registran estrictamente fuera del costeo de trabajos de tours. | Evita que los gastos generales distorsionen el margen bruto por reserva. |
| `Expense Cash Status` | Etiquetado explícitamente como `Paid` o `Unpaid`. | Solo los gastos generales `Paid` se deducen del flujo de caja neto mensual. |
| `Dynamic Array Spill Zones` | Los rangos de salida de fórmulas deben permanecer libres de tecleo manual. | Alerta estándar de obstrucción `#SPILL!` de Excel. |
| `Default Ledger Capacity` | Preconfigurado para filas `5–2000` por registro de transacciones. | Referencias de rango ampliables para DMC de alto volumen. |

### Límites de implementación y consideraciones operativas
Al desplegar este libro en un **entorno contable real de una agencia de viajes**, ten en cuenta los siguientes límites arquitectónicos:

- **Comprobaciones de duplicados de identificadores:** La detección automatizada de duplicados se ejecuta explícitamente sobre el `Booking ID`. La numeración secuencial única de `Invoice ID`, `Supplier Bill ID`, `Payment ID` y `Expense ID` debe mantenerse mediante la entrada estándar de filas.
- **Gestión de discrepancias de moneda:** Si bien el sistema activa una advertencia de auditoría cuando la moneda de un pago difiere de la moneda de su factura padre o factura de proveedor, no detiene el cálculo. Los tenedores de libros deben resolver las discrepancias de moneda antes de confiar en las cifras de saldo neto.
- **Umbral de riesgo crediticio de clientes:** La bandera automatizada de compradores de alto riesgo utiliza actualmente un **umbral estandarizado de tasa de cobro del 50%** en lugar de una celda de parámetro ajustable por el usuario.
- **Agregación de liquidaciones en moneda original:** Las fórmulas de saldo AR y AP suman los pagos divididos en su moneda nativa de factura; mantener la consistencia de moneda entre facturas y pagos correspondientes es necesario para un vencimiento preciso.
- **Tipos de cambio de referencia estáticos:** Los tipos de cambio FX globales son supuestos de gestión definidos manualmente en lugar de fuentes API en vivo, lo que garantiza un reporting financiero histórico estable y auditable.

---

## Preguntas frecuentes (FAQ de contabilidad y costeo de tours para agencias de viajes B2B)

<details>
<summary><strong>¿Cómo calculan las agencias de viajes y los DMC el margen de beneficio real por reserva de tour?</strong></summary>
<br>
Para calcular la rentabilidad precisa por reserva de tour (costeo de trabajos), una agencia de viajes debe vincular cada factura de cliente B2B y cada factura directa de proveedor de servicios en tierra (hoteles, autocares chárter, guías turísticos, comidas, entradas) a un <code>Booking ID</code> único. Restar el total de costes de proveedores normalizados de los ingresos facturados normalizados arroja el <strong>beneficio bruto por reserva</strong>. Dividir el beneficio bruto por reserva entre los ingresos facturados produce el <strong>margen bruto (%)</strong>, mientras que dividirlo entre el total de pasajeros que paga produce el <strong>beneficio por PAX</strong>.
</details>

<details>
<summary><strong>¿Por qué mi agencia de viajes es rentable sobre el papel pero se queda sin efectivo en el banco?</strong></summary>
<br>
Las agencias de viajes experimentan con frecuencia crisis de capital de trabajo debido a los desfases temporales entre las <strong>cuentas por cobrar (AR)</strong> y las <strong>cuentas por pagar (AP)</strong>. Cuando los socios B2B extranjeros pagan solo un depósito inicial del 20%–30% y liquidan el saldo después de completar el viaje, mientras los hoteles y proveedores de transporte locales exigen un prepago del 50%–100% antes de la llegada, las reservas rentables generan un flujo de caja temporalmente negativo. Hacer un seguimiento de los cobros reales de efectivo por separado de los ingresos devengados por facturas previene las crisis de liquidez en temporada alta.
</details>

<details>
<summary><strong>¿Puedo usar esta plantilla de Excel como alternativa gratuita al software ERP para agencias de viajes?</strong></summary>
<br>
Sí. Para tour operators receptivos pequeños y medianos, DMC boutique y agencias de viajes mayoristas que gestionan hasta ~2,000 transacciones anuales por libro mayor, este libro nativo de Microsoft Excel proporciona costeo de trabajos por reserva, vencimientos AR/AP multimoneda y paneles ejecutivos de P&L sin costes de suscripción SaaS recurrentes ni implementaciones complejas de ERP.
</details>

---

## Sobre el creador y el repositorio de código abierto

Diseño **rastreadores de inteligencia de negocio ligeros, hojas de cálculo de modelado financiero y herramientas de apoyo a la decisión operativa** para industrias donde los registros de transacciones fragmentados oscurecen la realidad comercial. Cada marco responde a una pregunta fundamental: *¿qué datos mínimos viables deben conectarse para que la dirección pueda tomar su próxima decisión financiera con confianza?*

- 📂 **[Explora más plantillas de modelado financiero de código abierto y herramientas de apoyo a las decisiones comerciales en Theseus Workshop en GitHub](https://github.com/HyVoid)**
- ⚖️ **[Revisa los términos completos de uso comercial y redistribución de la Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)**
