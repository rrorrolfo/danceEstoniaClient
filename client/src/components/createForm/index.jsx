/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Form,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { convertToRaw } from 'draft-js';
import TextEditor from '../textEditor/index';
import { createEvent, updateRequest } from '../../requests/requests';
import {
  getTodayISODate,
  dateToISODate,
  firstLetterToUppercase,
  isFieldEmpty,
  linkUrlSanitizer
} from '../../utils';
import './createForm.css';

const CreateEvent = ({
  isUser,
  match,
  isAdmin,
  isEdit,
  fetchSingleEvent,
  singleEvent,
  fetchSingleFestival,
  singleFestival,
  translatedText
}) => {
  // Data of event state
  const [todayDate, updateDate] = useState('');
  // Event type
  const [eventType, updateEventType] = useState('');
  const [noEventTypeselected, toggleNoEventTypeselected] = useState(false);
  // Dancing styles
  const [dancingStyles, updateDancingStyles] = useState([]);
  const [noStylesSelected, toggleNoStylesSelected] = useState(false);
  // Name of event
  const [nameOfEvent, updateNameOfEvent] = useState('');
  const [invalidName, toggleInvalidName] = useState(false);
  // Ticket data
  const [ticketPrice, updateTicketPrice] = useState(0);
  const [ticketCurrency, updateTicketCurrency] = useState('EUR');
  const [ticketURL, updateTicketURL] = useState('');
  const [invalidTicketURL, toggleInvalidTicketURL] = useState(false);
  // Date of event
  const [eventDate, updateEventDate] = useState('');
  const [invalidDate, toggleInvalidDate] = useState(false);
  // End date of event
  const [endDate, updateEndDate] = useState('');
  const [invalidEndDate, toggleInvalidEndDate] = useState(false);
  // General data
  const [startingTime, updateStartingTime] = useState('21:00');
  const [venueOfEvent, updateVenue] = useState('');
  const [invalidVenueName, toggleInvalidVenueName] = useState(false);
  const [venueAddress, updateVenueAddress] = useState('');
  const [city, updateCity] = useState('');
  const [invalidCity, toggleInvalidCity] = useState(false);
  const [country, updateCountry] = useState('Estonia');
  // Social Media
  const [fbEvent, updateFBEvent] = useState('');
  const [invalidFBUrl, toggleInvalidFBUrl] = useState(false);
  const [website, updateWebsite] = useState('');
  const [invalidWebsite, toggleInvalidWebsite] = useState(false);
  // Description
  const [description, updateDescription] = useState('');
  // Data of event state
  const [missingBanner, toggleMissingBanner] = useState(false);

  // Submission status alert
  const [showSubmissionStatus, toggleSubmisionStatus] = useState(false);
  const [alertVariant, updateAlertVariant] = useState('');
  const [submissionMessage, updateSubmissionMessage] = useState('');
  const [requestingAction, toggleRequestingAction] = useState(false);

  // Event to Edit
  const [eventToEdit, setEventToEdit] = useState(singleEvent || singleFestival);

  // Submit button text
  const customTypeText =
    eventType === '' ? 'event' : eventType.slice(0, eventType.length - 1);
  const [buttonText, updateButtonText] = useState(`Create ${customTypeText}`);
  useEffect(() => {
    if (requestingAction) {
      return updateButtonText(
        isEdit
          ? `Updating ${customTypeText}...`
          : `Creating ${customTypeText}...`
      );
    }
    return updateButtonText(
      isEdit ? `Update ${customTypeText}` : `Create ${customTypeText}`
    );
  }, [requestingAction, eventType, isEdit, customTypeText]);

  useEffect(() => {
    updateDate(getTodayISODate());
    updateEventDate(getTodayISODate());
    updateEndDate(getTodayISODate());
    if (isAdmin && isEdit) {
      const { category, style, id } = match.params;
      if (category === 'events') {
        fetchSingleEvent(`/${category}/${style}/${id}`);
      } else {
        fetchSingleFestival(`/${category}/${style}/${id}`);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEventToEdit(singleEvent || singleFestival);
  }, [singleEvent, singleFestival]);

  useEffect(() => {
    if (eventToEdit) {
      const {
        cityOfEvent,
        countryOfEvent,
        dateOfEvent,
        finishDateOfEvent,
        name,
        styles,
        timeOfEvent
      } = eventToEdit;
      updateEventType(match.params.category);
      updateDancingStyles(styles);
      updateNameOfEvent(name);
      updateTicketPrice(
        eventToEdit.ticketPrice === 'Free'
          ? '0'
          : eventToEdit.ticketPrice.slice(0, eventToEdit.ticketPrice.length - 3)
      );
      updateTicketCurrency(ticketCurrency);
      updateTicketURL(eventToEdit.ticketURL);
      updateEventDate(dateToISODate(dateOfEvent));
      updateEndDate(dateToISODate(finishDateOfEvent));
      updateStartingTime(timeOfEvent);
      updateVenue(eventToEdit.venueOfEvent);
      updateVenueAddress(eventToEdit.venueAddress);
      updateCity(cityOfEvent);
      updateCountry(countryOfEvent);
      updateFBEvent(eventToEdit.fbEvent);
      updateWebsite(eventToEdit.website);
    }
    // eslint-disable-next-line
  }, [eventToEdit]);

  useEffect(() => {
    if (dancingStyles.length) {
      return toggleNoStylesSelected(false);
    }
    return toggleNoStylesSelected(true);
  }, [dancingStyles]);

  useEffect(() => {
    let interval = 10000;
    if (isUser) {
      interval = 25000;
    }
    const clearMessage = setTimeout(
      () => toggleSubmisionStatus(false),
      interval
    );
    return () => clearTimeout(clearMessage);
  }, [showSubmissionStatus, isUser]);

  const validateDate = (date, isEndDate = false) => {
    const dateRegex = dateToValidate =>
      /^\d{4}-\d{2}-\d{2}$/i.test(dateToValidate);

    if (dateRegex(date) === false) {
      if (isEndDate) {
        toggleInvalidEndDate(true);
      } else {
        toggleInvalidDate(true);
      }
      return false;
    }
    if (isEndDate) {
      toggleInvalidEndDate(false);
    } else {
      toggleInvalidDate(false);
    }
    return true;
  };

  const rawJson = state => {
    const result = convertToRaw(state);
    return updateDescription(JSON.stringify(result));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    toggleRequestingAction(true);
    toggleSubmisionStatus(false);
    toggleNoEventTypeselected(false);
    toggleNoStylesSelected(false);
    toggleInvalidName(false);
    toggleMissingBanner(false);

    const img = document.querySelector('#event-banner');
    const ticketPriceString =
      ticketPrice === '' || ticketPrice === 0
        ? 'Free'
        : `${ticketPrice} ${ticketCurrency}`;

    let errors = 0;

    if (isFieldEmpty(eventType)) {
      toggleNoEventTypeselected(true);
      errors += 1;
    }

    if (!dancingStyles.length) {
      toggleNoStylesSelected(true);
      errors += 1;
    }

    if (isFieldEmpty(nameOfEvent)) {
      toggleInvalidName(true);
      errors += 1;
    }

    if (!img.files.length && !isAdmin && !isEdit) {
      toggleMissingBanner(true);
      errors += 1;
    }

    if (isFieldEmpty(venueOfEvent)) {
      toggleInvalidVenueName(true);
      errors += 1;
    }

    if (isFieldEmpty(city)) {
      toggleInvalidCity(true);
      errors += 1;
    }

    if (invalidDate || invalidFBUrl || invalidTicketURL || invalidWebsite) {
      errors += 1;
    }

    if (eventType === 'festivals' && invalidEndDate) {
      errors += 1;
    }

    if (errors !== 0) {
      toggleRequestingAction(false);
      updateSubmissionMessage(
        'Oops! Seems that some information is missing...'
      );
      updateAlertVariant('danger');
      toggleSubmisionStatus(true);
      return false;
    }

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
    eventData.append('ticketPrice', ticketPriceString);
    eventData.append('ticketURL', ticketURL);
    if (isAdmin) {
      eventData.append('isAuthorized', true);
    } else {
      eventData.append('isAuthorized', false);
    }
    eventData.append('image', img.files[0]);
    if (eventType === 'festivals') {
      eventData.append('website', website);
      eventData.append('finishDateOfEvent', endDate);
    }

    let submissionStatus;
    if (isAdmin && isEdit) {
      submissionStatus = await updateRequest(
        { endPoint: `/${eventType}/${eventToEdit._id}` },
        eventData
      );
    } else {
      submissionStatus = await createEvent(eventType, eventData);
    }

    if (isEdit && submissionStatus !== 200) {
      const errorText = 'Image file size is too large (max - 5MB)';
      updateSubmissionMessage(errorText);
      updateAlertVariant('danger');
      toggleSubmisionStatus(true);
      toggleRequestingAction(false);
      return false;
    }

    if (!isEdit && submissionStatus !== 201) {
      const errorText = (
        <ol>
          <span style={{ display: 'block' }}>
            Oops! seems that there is some information missing:
          </span>
          {submissionStatus.map(message => (
            <li key={message} style={{ marginTop: '10px' }}>
              {message}
            </li>
          ))}
        </ol>
      );
      updateSubmissionMessage(errorText);
      updateAlertVariant('danger');
      toggleSubmisionStatus(true);
      toggleRequestingAction(false);
      return false;
    }

    if (isEdit && submissionStatus === 200) {
      updateSubmissionMessage(
        `${eventToEdit.name} has been updated succesfully`
      );
    }

    if (isUser && !isEdit) {
      const nextStepsMessage = (
        <div>
          <h4 className="centered">{`Thank you for creating a new ${customTypeText}!`}</h4>
          <p>{`The ${customTypeText} "${nameOfEvent}" will be reviewed by one of our team members and if everything is ok it will be visible in Dance Estonia.`}</p>{' '}
          <p>This process should take only a few minutes.</p>
        </div>
      );
      updateSubmissionMessage(nextStepsMessage);
      updateNameOfEvent('');
      updateTicketPrice(0);
      updateTicketURL('');
      updateEventDate(getTodayISODate());
      updateEndDate(getTodayISODate());
      updateStartingTime('21:00');
      updateVenue('');
      updateVenueAddress('');
      updateCity('');
      updateCountry('Estonia');
      updateFBEvent('');
      updateWebsite('');
    }

    if (isAdmin && !isEdit) {
      updateSubmissionMessage(
        `The ${customTypeText} has been created succesfully!`
      );
    }

    updateAlertVariant('success');
    toggleSubmisionStatus(true);
    toggleRequestingAction(false);

    return true;
  };

  return (
    <Container className="create-form-container">
      <Container className="form-title margin-on-top">
        <h1 className="centered">{translatedText.form.title}</h1>
      </Container>
      <Form onSubmit={event => handleSubmit(event)} className="margin-on-top">
        <Form.Row>
          <h4 className="centered">{translatedText.form.kindOfEvent}</h4>
          {['radio'].map(type => (
            <div
              key={`inline-${type}`}
              className="mb-3 event-type-selection centered"
            >
              <Form.Check
                checked={eventType === 'events'}
                inline
                label={translatedText.general.eventOrParty}
                type={type}
                id={`inline-${type}-1`}
                name="event-type"
                className="event-label-selection"
                value="events"
                onChange={event => {
                  toggleNoEventTypeselected(false);
                  updateEventType(event.target.value);
                }}
              />
              <Form.Check
                checked={eventType === 'festivals'}
                inline
                label={translatedText.general.festival}
                type={type}
                id={`inline-${type}-2`}
                name="event-type"
                value="festivals"
                onChange={event => {
                  toggleNoEventTypeselected(false);
                  updateEventType(event.target.value);
                }}
              />
            </div>
          ))}
          <span
            style={{
              display: noEventTypeselected ? 'block' : 'none'
            }}
            className="centered custom-validation-message"
          >
            {translatedText.form.kindOfEventValidation}
          </span>
        </Form.Row>
        <Form.Row>
          <h4 className="centered margin-on-top">
            {translatedText.form.dancingStyles}
          </h4>
          {['checkbox'].map(type => (
            <div
              key={`style-${type}`}
              className="mb-3 style-selection centered"
            >
              <Form.Check
                checked={dancingStyles.includes('salsa')}
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
                checked={dancingStyles.includes('bachata')}
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
                checked={dancingStyles.includes('kizomba')}
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
            {translatedText.form.dancingStylesValidation}
          </span>
        </Form.Row>
        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="name-of-event">
            <Form.Label className="bold">
              Name of the event {translatedText.form.nameOfEvent} *
            </Form.Label>
            <Form.Control
              placeholder={translatedText.form.nameOfEvent}
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
              {translatedText.form.nameOfEventValidation}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="select-input-day-event"
            className="margin-on-top"
          >
            <Form.Label className="date-of-event-label bold">
              {translatedText.form.dateOfEvent}
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

          {eventType === 'festivals' ? (
            <Form.Group
              as={Col}
              controlId="select-input-end-day-festival"
              className="margin-on-top"
            >
              <Form.Label className="date-of-event-label bold">
                {translatedText.form.endDate} *
              </Form.Label>

              <input
                type="date"
                id="select-end-day-of-festival"
                name="day-of-event"
                value={endDate}
                min={todayDate}
                max="2022-12-31"
                onChange={event => {
                  updateEndDate(event.target.value);
                  validateDate(event.target.value, true);
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ display: invalidEndDate ? 'block' : 'none' }}
              >
                Please select the date of the festival.
              </Form.Control.Feedback>
            </Form.Group>
          ) : null}

          <Form.Group
            as={Col}
            controlId="select-time-start-event"
            className="margin-on-top"
          >
            <Form.Label className="time-of-event-label bold">
              {translatedText.form.startTime}
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

        <Form.Group
          as={Col}
          controlId="ticket-price"
          style={{ display: 'flex', paddingLeft: '7.5px' }}
          className="margin-on-top"
        >
          <Form.Row className="ticket-price-input-1">
            <Form.Label className="bold">
              {translatedText.form.ticketPrice}
            </Form.Label>
            <Form.Control
              placeholder="Price in numbers (e.g. 10, 5.5, 5 - 25)"
              className="ticket-price-amount"
              name="ticket-price-amount"
              value={ticketPrice}
              onChange={event => updateTicketPrice(event.target.value)}
            />
          </Form.Row>
          <Form.Row className="ticket-price-input-2">
            <Form.Group>
              <Form.Label className="bold">
                {translatedText.form.currency}
              </Form.Label>
              <Form.Control
                as="select"
                name="select-country"
                onChange={event => updateTicketCurrency(event.target.value)}
                value={ticketCurrency}
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
                  If the {customTypeText} is free you can leave &quot;0&quot; as
                  the ticket price.
                </Tooltip>
              }
            >
              <span
                className="d-inline-block tooltip-ticket-price"
                style={{ marginLeft: '50px', marginTop: '35px' }}
              >
                <div>{translatedText.form.freeFestival}</div>
              </span>
            </OverlayTrigger>
          </Form.Row>
        </Form.Group>

        <Form.Group controlId="venue">
          <Form.Label className="bold">
            {translatedText.form.ticketLink}
          </Form.Label>
          <Form.Control
            placeholder={`Url where you can buy tickets for this ${customTypeText}`}
            value={ticketURL}
            onChange={event => {
              updateTicketURL(event.target.value);
              linkUrlSanitizer(event.target.value, toggleInvalidTicketURL);
            }}
            isInvalid={invalidTicketURL}
          />
          <Form.Control.Feedback type="invalid">
            The url format is not valid.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="venue">
          <Form.Label className="bold">
            {translatedText.form.venueName} *
          </Form.Label>
          <Form.Control
            placeholder={translatedText.form.venuePlaceholder}
            value={venueOfEvent}
            onChange={event => {
              updateVenue(event.target.value);
              toggleInvalidVenueName(isFieldEmpty(event.target.value));
            }}
            isInvalid={invalidVenueName}
          />
          <Form.Control.Feedback type="invalid">
            {translatedText.form.venueNameValidation}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row className="margin-on-top">
          <Form.Group controlId="venue-address">
            <Form.Label className="bold">
              {translatedText.form.venueAddress}
            </Form.Label>
            <Form.Control
              placeholder={translatedText.form.venueAddressPlaceholder}
              value={venueAddress}
              onChange={event => updateVenueAddress(event.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group controlId="city">
            <Form.Label className="bold">
              {translatedText.form.city} *
            </Form.Label>
            <Form.Control
              placeholder={translatedText.form.cityPlaceholder}
              value={city}
              onChange={event => {
                updateCity(event.target.value);
                toggleInvalidCity(isFieldEmpty(event.target.value));
              }}
              isInvalid={invalidCity}
            />
            <Form.Control.Feedback type="invalid">
              {translatedText.form.cityValidation}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="country">
            <Form.Label className="bold">
              {translatedText.form.country} *
            </Form.Label>
            <Form.Control
              as="select"
              name="select-country"
              value={country}
              onChange={event => updateCountry(event.target.value)}
            >
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

        {eventType !== 'festivals' ? (
          <Form.Row className="margin-on-top">
            <Form.Group as={Col} controlId="fbEvent">
              <Form.Label className="bold">
                {translatedText.form.fbEvent}
              </Form.Label>
              <Form.Control
                placeholder="Facebook event URL (e.g. www.facebook.com/event)"
                value={fbEvent}
                onChange={event => {
                  updateFBEvent(event.target.value);
                  linkUrlSanitizer(event.target.value, toggleInvalidFBUrl);
                }}
                isInvalid={invalidFBUrl}
              />
              <Form.Control.Feedback type="invalid">
                The url format is not valid.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        ) : null}

        {eventType === 'festivals' ? (
          <Form.Row className="margin-on-top">
            <Form.Group as={Col} controlId="website">
              <Form.Label className="bold">
                {translatedText.form.website}
              </Form.Label>
              <Form.Control
                placeholder={translatedText.form.websitePlaceholder}
                value={website}
                onChange={event => {
                  updateWebsite(event.target.value);
                  linkUrlSanitizer(event.target.value, toggleInvalidWebsite);
                }}
                isInvalid={invalidWebsite}
              />
              <Form.Control.Feedback type="invalid">
                The url format is not valid.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        ) : null}

        <Form.Group id="description" className="margin-on-top">
          <h5 className="centered">{translatedText.form.description} *</h5>
          <TextEditor rawJson={rawJson} />
        </Form.Group>

        <Form.Row className="margin-on-top">
          <Form.Group as={Col} controlId="event-banner">
            <Form.Label className="bold">
              {translatedText.form.image} *
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
              {translatedText.form.imageValidation}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Alert
          show={showSubmissionStatus}
          key="submission-status"
          variant={alertVariant}
          onClose={() => toggleSubmisionStatus(false)}
        >
          {submissionMessage}
        </Alert>

        <Button
          variant="primary"
          type="submit"
          className="submit-create-form-button"
          disabled={requestingAction}
        >
          {buttonText}
        </Button>
      </Form>
    </Container>
  );
};

CreateEvent.propTypes = {
  isUser: PropTypes.bool,
  match: PropTypes.object,
  isAdmin: PropTypes.bool,
  isEdit: PropTypes.bool,
  fetchSingleEvent: PropTypes.func,
  singleEvent: PropTypes.object,
  fetchSingleFestival: PropTypes.func,
  singleFestival: PropTypes.object
};

CreateEvent.defaultProps = {
  isUser: true,
  match: null,
  isAdmin: false,
  isEdit: false,
  fetchSingleEvent: null,
  singleEvent: null,
  fetchSingleFestival: null,
  singleFestival: null
};

export default CreateEvent;
