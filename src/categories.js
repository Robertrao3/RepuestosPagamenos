export const CATEGORY_MAP = [
  { label: "Suspensión",           icon: "🛞", pattern: /AMORTIGUADOR|BALLESTA|ESPIRAL|MESETA|GUARDA POLVO|MUNON|BOCINA SUSPEN|BASE AMORTIGUADOR|DAMPER|ARAÑA|ARANA/ },
  { label: "Dirección",            icon: "🔧", pattern: /TERMINAL DIRECCI|BARRA DIRECCI|BRAZO DIRECCI|KIT DIRECCI|CAJA DIRECCI|CREMALLERA|TERMINAL ESTABILIZADOR/ },
  { label: "Frenos",               icon: "🛑", pattern: /PASTILLAS|DISCO FRENO|BOMBA FRENO|CILINDRO FRENO|TAMBOR FRENO|KIT CALIPER|MANGUERA FRENO|MORDAZA|KIT BOMBA FRENO/ },
  { label: "Motor",                icon: "⚙️", pattern: /CONCHAS|ANILLOS|PISTONES|EMPACADURA|VALVULAS MOTOR|VALVULA MOTOR|BOMBA ACEITE|ARBOL DE LEVA|BASE MOTOR|CADENA|GOMAS VALVULA|ESPARRAGO|CARTER/ },
  { label: "Combustible",          icon: "⛽", pattern: /CARBURADOR|BOMBA GAS|FILTRO GAS|FILTRO GASOLINA|INYECTOR/ },
  { label: "Correas y Tensores",   icon: "📎", pattern: /CORREA|TENSOR CORREA|FAJA/ },
  { label: "Refrigeración",        icon: "🌡️", pattern: /MANGUERA RADIADOR|FILTRO AIRE|FILTRO ACEITE|RADIADOR|BOMBA AGUA|TERMOSTATO|ELECTRO.VENTILADOR|ASPA VENTILADOR/ },
  { label: "Transmisión y Clutch", icon: "🔩", pattern: /DISCO CLUTCH|PLATO CLUTCH|COLLARIN|PUNTA TRIPOIDE|PUNTA EJE|ENGRANAJE|ARO SINCRONICO|GUAYA CLUTCH|BOMBA PRINCIPAL CLUTCH|BOMBA AUXILIAR CLUTCH/ },
  { label: "Eléctrico y Luces",    icon: "💡", pattern: /COCUYO|FARO|CABLES BUJIAS|BUJIA|BOBINA|TAPA DISTRIBUIDOR|ROTOR DISTRIBUIDOR|RELE|RELAY|SWITCH|ALTERNADOR|ARRANQUE|BOMBILLO/ },
  { label: "Rodamientos y Sellos", icon: "⭕", pattern: /ROLINERA|ESTOPERA|RETÉN|RETEN|SELLO/ },
  { label: "Cables y Guayas",      icon: "🔌", pattern: /GUAYA|CABLE ACELERADOR/ },
  { label: "Carrocería",           icon: "🚗", pattern: /ALFOMBRA|ESPEJO RETROVISOR|MANILLA|PARRILLA|MICA FARO|EMBLEMA|PANTALLA FARO/ },
];

export function getCategory(nombre) {
  const n = (nombre || "").toUpperCase();
  for (const cat of CATEGORY_MAP) {
    if (cat.pattern.test(n)) return cat.label;
  }
  return "Otros Repuestos";
}

export function getCategoryIcon(label) {
  return CATEGORY_MAP.find((c) => c.label === label)?.icon ?? "📦";
}
