import React, { useEffect, useState } from 'react';
import {
  Container,
  Form,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { getTodayISODate } from '../../utils';
import { createEvent } from '../../requests/requests';
import './createForm.css';

const CreateEvent = () => {
  const [requestErrors, updateRequestErrors] = useState([]);
  // Data of event state
  const [todayDate, updateDate] = useState('');
  const [eventType, updateEventType] = useState('');
  const [noEventTypeselected, toggleNoEventTypeselected] = useState(false);
  const [dancingStyles, updateDancingStyles] = useState([]);
  const [noStylesSelected, toggleNoStylesSelected] = useState(false);
  const [nameOfEvent, updateNameOfEvent] = useState('');
  const [invalidName, toggleInvalidName] = useState(false);
  const [ticketPrice, updateTicketPrice] = useState(0);
  const [ticketCurrency, updateTicketCurrency] = useState('EUR');
  const [eventDate, updateEventDate] = useState('');
  const [invalidDate, toggleInvalidDate] = useState(false);
  const [startingTime, updateStartingTime] = useState('21:00');
  const [venueOfEvent, updateVenue] = useState('');
  const [venueAddress, updateVenueAddress] = useState('');
  const [city, updateCity] = useState('');
  const [country, updateCountry] = useState('Estonia');
  const [fbEvent, updateFBEvent] = useState('');
  const [description, updateDescription] = useState('');
  const [invalidDescription, toggleInvalidDescription] = useState(false);
  const [missingBanner, toggleMissingBanner] = useState(false);

  useEffect(() => {
    updateDate(getTodayISODate());
    updateEventDate(getTodayISODate());
  }, []);

  useEffect(() => {
    // this validation can be done better on submit
    if (eventType === '') {
      return toggleNoEventTypeselected(true);
    }
    return toggleNoEventTypeselected(false);
  }, [eventType]);

  useEffect(() => {
    // this validation can be done better on submit
    if (dancingStyles.length) {
      return toggleNoStylesSelected(false);
    }
    return toggleNoStylesSelected(true);
  }, [dancingStyles]);

  const customTypeText =
    eventType === '' ? 'event' : eventType.slice(0, eventType.length - 1);

  const validateDate = date => {
    const dateRegex = dateToValidate =>
      /^\d{4}-\d{2}-\d{2}$/i.test(dateToValidate);

    if (dateRegex(date) === false) {
      toggleInvalidDate(true);
      return false;
    }
    toggleInvalidDate(false);
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();

    const img = document.querySelector('#event-banner');
    const eventData = new FormData();

    eventData.append('name', nameOfEvent);
    dancingStyles.forEach(style => eventData.append('styles', style));
    eventData.append('venueOfEvent', venueOfEvent);
    eventData.append('venueAddress', venueAddress);
    eventData.append('cityOfEvent', city);
    eventData.append('countryOfEvent', country);
    eventData.append('dateOfEvent', eventDate);
    eventData.append('timeOfEvent', startingTime);
    eventData.append('description', description);
    eventData.append('fbEvent', fbEvent);
    eventData.append('ticketPrice', `${ticketPrice} ${ticketCurrency}`);
    eventData.append('image', img.files[0]);

    createEvent(eventType, eventData, updateRequestErrors);
  };

  return (
    <Container className="create-form-container">
      <Form onSubmit={event => handleSubmit(event)}>
        <Form.Row>
          <h4 className="centered">What kind of event you want to create?</h4>
          {['radio'].map(type => (
            <div
              key={`inline-${type}`}
              className="mb-3 event-type-selection centered"
            >
              <Form.Check
                inline
                label="Event or party"
                type={type}
                id={`inline-${type}-1`}
                name="event-type"
                className="event-label-selection"
                value="events"
                onChange={event => {
                  updateEventType(event.target.value);
                }}
              />
              <Form.Check
                inline
                label="Festival"
                type={type}
                id={`inline-${type}-2`}
                name="event-type"
                value="festivals"
                onChange={event => updateEventType(event.target.value)}
              />
            </div>
          ))}
          <span
            style={{ display: noEventTypeselected ? 'block' : 'none' }}
            className="centered custom-validation-message"
          >
            Please select the type of event you want to create.
          </span>
        </Form.Row>
        <Form.Row>
          <h4 className="centered">
            What dancing style is the {customTypeText}?
          </h4>
          {['checkbox'].map(type => (
            <div
              key={`style-${type}`}
              className="mb-3 style-selection centered"
            >
              <Form.Check
                inline
                label="Salsa"
                type={type}
                id={`style-${type}-1`}
                value="salsa"
                onChange={() => {
                  const hasSalsa = dancingStyles.indexOf('salsa');
                  if (hasSalsa === -1) {
                    return updateDancingStyles([...dancingStyles, 'salsa']);
                  }
                  const finalArray = dancingStyles;
                  finalArray.splice(hasSalsa, 1);
                  return updateDancingStyles([...finalArray]);
                }}
              />
              <Form.Check
                inline
                label="Bachata"
                type={type}
                id={`style-${type}-2`}
                value="bachata"
                onChange={() => {
                  const hasBachata = dancingStyles.indexOf('bachata');
                  if (hasBachata === -1) {
                    return updateDancingStyles([...dancingStyles, 'bachata']);
                  }
                  const finalArray = dancingStyles;
                  finalArray.splice(hasBachata, 1);
                  return updateDancingStyles([...finalArray]);
                }}
              />
              <Form.Check
                inline
                label="Kizomba"
                type={type}
                id={`style-${type}-3`}
                value="kizomba"
                onChange={() => {
                  const hasKizomba = dancingStyles.indexOf('kizomba');
                  if (hasKizomba === -1) {
                    return updateDancingStyles([...dancingStyles, 'kizomba']);
                  }
                  const finalArray = dancingStyles;
                  finalArray.splice(hasKizomba, 1);
                  return updateDancingStyles([...finalArray]);
                }}
              />
            </div>
          ))}
          <span
            style={{ display: noStylesSelected ? 'block' : 'none' }}
            className="centered custom-validation-message"
          >
            Please select at least one dancing style.
          </span>
        </Form.Row>
        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="name-of-event">
            <Form.Label className="bold">
              Name of the event{' '}
              {eventType === ''
                ? 'event'
                : eventType.slice(0, eventType.length - 1)}
            </Form.Label>
            <Form.Control
              placeholder={
                eventType === ''
                  ? 'Name of the event'
                  : `Name of the ${eventType.slice(0, eventType.length - 1)}`
              }
              value={nameOfEvent}
              onChange={event => {
                toggleInvalidName(false);
                if (event.target.value === '') {
                  toggleInvalidName(true);
                }
                updateNameOfEvent(event.target.value);
              }}
              isInvalid={invalidName}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name for the {customTypeText}.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="ticket-price"
            style={{ display: 'flex', paddingLeft: '7.5px' }}
          >
            <Form.Row className="ticket-price-input-1">
              <Form.Label className="bold">Ticket Price</Form.Label>
              <Form.Control
                placeholder="Price in number e.g. 5"
                className="ticket-price-amount"
                name="ticket-price-amount"
                value={ticketPrice}
                onChange={event => updateTicketPrice(event.target.value)}
              />
            </Form.Row>
            <Form.Row className="ticket-price-input-2">
              <Form.Group>
                <Form.Label className="bold">Currency</Form.Label>
                <Form.Control
                  as="select"
                  name="select-country"
                  onChange={event => updateTicketCurrency(event.target.value)}
                >
                  <option value="EUR">EUR</option>
                  <option value="BYN">BYN</option>
                  <option value="BAM">BAM</option>
                  <option value="BGN">BGN</option>
                  <option value="HRK">HRK</option>
                  <option value="CZK">CZK</option>
                  <option value="DKK">DKK</option>
                  <option value="GEL">GEL</option>
                  <option value="HUF">HUF</option>
                  <option value="ISK">ISK</option>
                  <option value="CHF">CHF</option>
                  <option value="MDL">MDL</option>
                  <option value="MKD">MKD</option>
                  <option value="NOK">NOK</option>
                  <option value="PLN">PLN</option>
                  <option value="RON">RON</option>
                  <option value="RUB">RUB</option>
                  <option value="RSD">RSD</option>
                  <option value="SEK">SEK</option>
                  <option value="CHF">CHF</option>
                  <option value="TRY">TRY</option>
                  <option value="UAH">UAH</option>
                  <option value="GBP">GBP</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-ticket-price-info">
                    If the event is free you can leave the ticket price field
                    empty or just put 0.
                  </Tooltip>
                }
              >
                <span
                  className="d-inline-block tooltip-ticket-price"
                  style={{ marginLeft: '50px', marginTop: '35px' }}
                >
                  <div>Event is free?</div>
                </span>
              </OverlayTrigger>
            </Form.Row>
          </Form.Group>

          <Form.Row className="margin-on-top">
            <Form.Group
              as={Col}
              controlId="select-input-day-event"
              className="margin-on-top"
            >
              <Form.Label className="date-of-event-label bold">
                Date of the event:
              </Form.Label>

              <input
                type="date"
                id="select-day-of-event"
                name="day-of-event"
                value={eventDate}
                min={todayDate}
                max="2022-12-31"
                onChange={event => {
                  updateEventDate(event.target.value);
                  validateDate(event.target.value);
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ display: invalidDate ? 'block' : 'none' }}
              >
                Please select the date of the {customTypeText}.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="select-time-start-event"
              className="margin-on-top"
            >
              <Form.Label className="time-of-event-label bold">
                Time the {customTypeText} starts:
              </Form.Label>

              <input
                type="time"
                id="select-time-of-event"
                name="time-of-event"
                value={startingTime}
                onChange={event => updateStartingTime(event.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group as={Col} controlId="venue">
            <Form.Label className="bold">Venue</Form.Label>
            <Form.Control
              placeholder={
                eventType === ''
                  ? 'Venue of the event'
                  : `Venue of the ${eventType.slice(0, eventType.length - 1)}`
              }
              value={venueOfEvent}
              onChange={event => updateVenue(event.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group controlId="venue-address">
            <Form.Label className="bold">Venue address</Form.Label>
            <Form.Control
              placeholder={
                eventType === ''
                  ? 'Address of the event venue'
                  : `Address of the ${eventType.slice(
                      0,
                      eventType.length - 1
                    )} venue`
              }
              value={venueAddress}
              onChange={event => updateVenueAddress(event.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group controlId="city">
            <Form.Label className="bold">City</Form.Label>
            <Form.Control
              placeholder="e.g. Tallinn"
              value={city}
              onChange={event => updateCity(event.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="country">
            <Form.Label className="bold">Country</Form.Label>
            <Form.Control
              as="select"
              name="select-country"
              value={country}
              onChange={event => updateCountry(event.target.value)}
            >
              <option value="default">Choose a country</option>
              <option value="Albania">Albania</option>
              <option value="Andorra">Andorra</option>
              <option value="Armenia">Armenia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Bosnia and Herzegovina">
                Bosnia and Herzegovina
              </option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Croatia">Croatia</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Estonia">Estonia</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Greece">Greece</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="Ireland">Ireland</option>
              <option value="Italy">Italy</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Latvia">Latvia</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Malta">Malta</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Netherlands">Netherlands</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="San Marino">San Marino</option>
              <option value="Serbia">Serbia</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Spain">Spain</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Turkey">Turkey</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Kingdom">United Kingdom</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="fbEvent">
            <Form.Label className="bold">Facebook event</Form.Label>
            <Form.Control
              placeholder="URL of the facebook event."
              value={fbEvent}
              onChange={event => updateFBEvent(event.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group id="description" className="margin-on-top">
          <h5 className="centered">
            Write the description of the {customTypeText}.
          </h5>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Description"
            name="event-description"
            value={description}
            onChange={event => {
              toggleInvalidDescription(false);
              if (event.target.value.length < 40) {
                toggleInvalidDescription(true);
              }
              updateDescription(event.target.value);
            }}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            The description of the {customTypeText} needs to be at least 40
            characters long.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="event-banner">
            <Form.Label className="bold">
              Select an image to be displayed with the {customTypeText}.
            </Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png"
              name="event-banner"
              onChange={event => {
                toggleMissingBanner(false);
                if (event.target.value === '') {
                  toggleMissingBanner(true);
                }
              }}
              isInvalid={missingBanner}
            />
            <Form.Control.Feedback type="invalid">
              Please add an image for the {customTypeText}.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Button
          variant="primary"
          type="submit"
          className="submit-create-form-button"
        >
          Create {customTypeText}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEvent;
