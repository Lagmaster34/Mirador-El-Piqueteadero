/*
 * Datos del menú de Mirador El Piqueteadero.
 * Para actualizar el menú: edita este archivo únicamente.
 * "Signature" no está aquí — se muestra en la tarjeta destacada
 * fija dentro de index.html (sección #menu).
 */
const MENU_DATA = [
  {
    id: "entradas",
    name: "Entradas",
    icon: "🌽",
    items: [
      { name: "Arepa con chicharrón", price: "$20" },
      { name: "Arepa con morcilla", price: "$15" },
      { name: "Arepa con chunchurria", price: "$10" },
      { name: "Ceviche de chicharrón", price: "$25" },
      { name: "Patacones con hogao", price: "$12" },
      { name: "Arepa con hogao", price: "$12" },
      { name: "Dorycrazy", variants: [{ label: "Personal", price: "$16" }, { label: "Familiar", price: "$30" }] }
    ]
  },
  {
    id: "compartir",
    name: "Para compartir",
    icon: "🍟",
    twoCol: true,
    items: [
      { name: "Fritanga colombiana", price: "$45" },
      { name: "Papas montañeras", price: "$28" },
      { name: "Papas con todo", price: "$25" },
      { name: "Papas mixtas", price: "$25" },
      { name: "Papas pollo y tocineta", price: "$25" },
      { name: "Salchipapas", price: "$18" },
      { name: "Nuggets de pollo", price: "$20" }
    ]
  },
  {
    id: "almuerzos",
    name: "Almuerzos",
    icon: "🍲",
    note: "Solo fines de semana.",
    items: [
      { name: "Sancocho de res", price: "$30" },
      { name: "Frijoles", price: "$30" },
      { name: "Montañerito", price: "$35" }
    ]
  },
  {
    id: "merienda",
    name: "Pal frío",
    icon: "☕",
    twoCol: true,
    items: [
      { name: "Migado", price: "$18" },
      { name: "Chocolate con queso", price: "$12" },
      { name: "Chocolate", price: "$6" },
      { name: "Chocolate en leche", price: "$10" },
      { name: "Café con leche", price: "$6" },
      { name: "Tinto", price: "$2" },
      { name: "Aromática", price: "$2" },
      { name: "Canelita", price: "$6" },
      { name: "Milo", price: "$10" },
      { name: "Tinto envenenado", price: "$8" },
      { name: "Vino caliente", price: "$12" }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas frías",
    icon: "🥤",
    twoCol: true,
    items: [
      { name: "Sodas afrutadas", price: "$10" },
      { name: "Micheladas afrutadas", price: "$12" },
      { name: "Michelada tradicional", price: "$8" },
      { name: "Cerveza", price: "$6" },
      { name: "Club Colombia", price: "$7" },
      { name: "Milo", price: "$10" },
      { name: "Gaseosa Postobón / Coca-Cola", price: "$5" },
      { name: "Copa de sangría", price: "$12" },
      { name: "Copa de vino", price: "$10" }
    ]
  },
  {
    id: "licores",
    name: "Licores",
    icon: "🍷",
    items: [
      { name: "Aguardiente Tapa Roja", variants: [{ label: "Copa", price: "$6" }, { label: "Media", price: "$55" }, { label: "Litro", price: "$110" }] },
      { name: "Aguardiente Tapa Verde", variants: [{ label: "Copa", price: "$6" }, { label: "Media", price: "$55" }, { label: "Litro", price: "$110" }] },
      { name: "Aguardiente Manzanares", variants: [{ label: "Copa", price: "$6" }, { label: "Media", price: "$55" }, { label: "Litro", price: "$110" }] },
      { name: "Ron Viejo de Caldas", variants: [{ label: "Copa", price: "$6" }, { label: "Media", price: "$55" }, { label: "Litro", price: "$110" }] }
    ]
  }
];