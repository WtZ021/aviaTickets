import currencyUI from './currency';

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }
  addFavorit(item) {
    let container = document.querySelector('div.dropdown-content');
    const dataTicket = this.favoritTicketData(item);
    this.favoritTicketRender(container, dataTicket);
  }
  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
        </div>
        <div class="ticket-origin d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto favoritBtn">Add to favorites</a>
      </div>
    </div>
    `;
  }

  favoritTicketData(item) {
    const airline_logo = item.querySelector('img').getAttribute('src');
    const original = item.querySelector('div.ticket-origin').querySelector('span.ticket-city').outerText;
    const departure = item.querySelector('div.ticket-destination').querySelector('span.ticket-city').outerText;
    const origin_date = item.querySelector('div.ticket-time-price').querySelector('span.ticket-time-departure').outerText;
    const priceTicket = item.querySelector('div.ticket-time-price').querySelector('span.ticket-price').outerText;
    const transfers = item.querySelector('div.ticket-additional-info').querySelector('span.ticket-transfers').outerText;
    const air_number = item.querySelector('div.ticket-additional-info').querySelector('span.ticket-flight-number').outerText;
    return {
      airline_logo,
      original,
      departure,
      origin_date,
      priceTicket,
      transfers,
      air_number,
    }
  }

  favoritTicketRender(container, dataTicket) {
    container.insertAdjacentHTML('afterbegin',
      `
      <div class="favorite-item  d-flex align-items-start">
        <img src="${dataTicket.airline_logo}" class="favorite-item-airline-img"/>
        <div class="favorite-item-info d-flex flex-column">
          
        <div class="favorite-item-destination d-flex align-items-center" >
            
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${dataTicket.original} </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>

            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${dataTicket.departure}</span>
            </div>
        </div>


        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${dataTicket.origin_date}</span>
          <span class="ticket-price ml-auto">${dataTicket.priceTicket}</span>
        </div>

        <div class="ticket-additional-info">
          <span class="ticket-transfers">${dataTicket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${dataTicket.air_number}</span>
        </div>
        </div>  
        <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
      </div>
    `
    );
  }
  deleteFavorit(item) {
    const delItem = item.parentElement;
    if (delItem.parentNode) {
      delItem.parentNode.removeChild(delItem);
    }
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
