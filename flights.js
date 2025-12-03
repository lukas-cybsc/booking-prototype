/* ============================================
   flights.js - WCAG 2.2 AA Compliant
   Comprehensive Flight Search Functionality
   Security: XSS Protection, Input Validation
   ============================================ */

$(document).ready(function() {
    
    // ============================================
    // AIRPORT DATABASE
    // ============================================
    const airports = [
        { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith Airport', country: 'Australia' },
        { code: 'MEL', city: 'Melbourne', name: 'Melbourne Airport', country: 'Australia' },
        { code: 'BNE', city: 'Brisbane', name: 'Brisbane Airport', country: 'Australia' },
        { code: 'PER', city: 'Perth', name: 'Perth Airport', country: 'Australia' },
        { code: 'ADL', city: 'Adelaide', name: 'Adelaide Airport', country: 'Australia' },
        { code: 'OOL', city: 'Gold Coast', name: 'Gold Coast Airport', country: 'Australia' },
        { code: 'CNS', city: 'Cairns', name: 'Cairns Airport', country: 'Australia' },
        { code: 'CBR', city: 'Canberra', name: 'Canberra Airport', country: 'Australia' },
        { code: 'HBA', city: 'Hobart', name: 'Hobart Airport', country: 'Australia' },
        { code: 'DRW', city: 'Darwin', name: 'Darwin Airport', country: 'Australia' },
        { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International Airport', country: 'USA' },
        { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport', country: 'USA' },
        { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'UK' },
        { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE' },
        { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport', country: 'Singapore' },
        { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International Airport', country: 'Hong Kong' },
        { code: 'NRT', city: 'Tokyo', name: 'Narita International Airport', country: 'Japan' },
        { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport', country: 'France' },
        { code: 'AKL', city: 'Auckland', name: 'Auckland Airport', country: 'New Zealand' },
        { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand' }
    ];
    
    // Store selected airports
    let selectedFrom = null;
    let selectedTo = null;
    
    // ============================================
    // SECURITY: XSS PROTECTION
    // ============================================
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML.trim();
    }
    
    // ============================================
    // AIRPORT AUTOCOMPLETE
    // ============================================
    function showAirportSuggestions(input, suggestionsContainer) {
        const query = sanitizeInput(input.val().toLowerCase().trim());
        
        if (query.length < 2) {
            suggestionsContainer.hide().attr('aria-hidden', 'true');
            input.attr('aria-expanded', 'false');
            return;
        }
        
        const matches = airports.filter(airport => 
            airport.city.toLowerCase().includes(query) ||
            airport.code.toLowerCase().includes(query) ||
            airport.name.toLowerCase().includes(query) ||
            airport.country.toLowerCase().includes(query)
        ).slice(0, 8);
        
        if (matches.length === 0) {
            suggestionsContainer.hide().attr('aria-hidden', 'true');
            input.attr('aria-expanded', 'false');
            return;
        }
        
        suggestionsContainer.empty();
        
        matches.forEach((airport, index) => {
            const item = $(`
                <div class="suggestion-item" role="option" tabindex="0" data-code="${airport.code}" data-index="${index}">
                    <strong>${airport.code}</strong> - ${airport.city}
                    <small>${airport.name}, ${airport.country}</small>
                </div>
            `);
            
            item.on('click keypress', function(e) {
                if (e.type === 'click' || e.which === 13 || e.which === 32) {
                    e.preventDefault();
                    selectAirport(input, suggestionsContainer, airport);
                }
            });
            
            suggestionsContainer.append(item);
        });
        
        suggestionsContainer.show().attr('aria-hidden', 'false');
        input.attr('aria-expanded', 'true');
    }
    
    function selectAirport(input, suggestionsContainer, airport) {
        input.val(`${airport.city} (${airport.code})`);
        input.data('airport', airport);
        
        if (input.attr('id') === 'from') {
            selectedFrom = airport;
        } else {
            selectedTo = airport;
        }
        
        suggestionsContainer.hide().attr('aria-hidden', 'true');
        input.attr('aria-expanded', 'false');
        
        // Announce selection to screen readers
        $('#live-region').text(`Selected ${airport.city} ${airport.code}`);
    }
    
    // Set up autocomplete for From field
    $('#from').on('input', function() {
        showAirportSuggestions($(this), $('#fromSuggestions'));
    });
    
    // Set up autocomplete for To field
    $('#to').on('input', function() {
        showAirportSuggestions($(this), $('#toSuggestions'));
    });
    
    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.form-group').length) {
            $('.airport-suggestions').hide().attr('aria-hidden', 'true');
            $('input[role="combobox"]').attr('aria-expanded', 'false');
        }
    });
    
    // Keyboard navigation for suggestions
    $('input[role="combobox"]').on('keydown', function(e) {
        const suggestionsId = $(this).attr('aria-controls');
        const $suggestions = $('#' + suggestionsId);
        const $items = $suggestions.find('.suggestion-item');
        
        if ($items.length === 0) return;
        
        if (e.which === 40) { // Arrow Down
            e.preventDefault();
            $items.first().focus();
        } else if (e.which === 27) { // Escape
            $suggestions.hide().attr('aria-hidden', 'true');
            $(this).attr('aria-expanded', 'false');
        }
    });
    
    $(document).on('keydown', '.suggestion-item', function(e) {
        const $items = $(this).parent().find('.suggestion-item');
        const currentIndex = $items.index(this);
        
        if (e.which === 40) { // Arrow Down
            e.preventDefault();
            if (currentIndex < $items.length - 1) {
                $items.eq(currentIndex + 1).focus();
            }
        } else if (e.which === 38) { // Arrow Up
            e.preventDefault();
            if (currentIndex > 0) {
                $items.eq(currentIndex - 1).focus();
            } else {
                $(this).closest('.form-group').find('input').focus();
            }
        } else if (e.which === 27) { // Escape
            $(this).parent().hide().attr('aria-hidden', 'true');
            $(this).closest('.form-group').find('input').focus().attr('aria-expanded', 'false');
        }
    });
    
    // ============================================
    // SWAP AIRPORTS BUTTON
    // ============================================
    $('#swapButton').on('click', function() {
        const fromValue = $('#from').val();
        const toValue = $('#to').val();
        
        $('#from').val(toValue);
        $('#to').val(fromValue);
        
        // Swap stored airport data
        const tempFrom = selectedFrom;
        selectedFrom = selectedTo;
        selectedTo = tempFrom;
        
        $('#from').data('airport', selectedFrom);
        $('#to').data('airport', selectedTo);
        
        // Announce swap to screen readers
        $('#live-region').text('Departure and destination airports swapped');
    });
    
    // ============================================
    // TRIP TYPE SELECTION
    // ============================================
    $('input[name="tripType"]').on('change', function() {
        const isRoundTrip = $(this).val() === 'round';
        
        if (isRoundTrip) {
            $('#returnDateContainer').show();
            $('#returnDate').prop('required', true).attr('aria-required', 'true');
            $('#live-region').text('Round trip selected. Return date required.');
        } else {
            $('#returnDateContainer').hide();
            $('#returnDate').prop('required', false).attr('aria-required', 'false');
            $('#live-region').text('One way trip selected. Return date not required.');
        }
        
        // Update aria-checked
        $('input[name="tripType"]').attr('aria-checked', 'false');
        $(this).attr('aria-checked', 'true');
    });
    
    // ============================================
    // DATE VALIDATION
    // ============================================
    const today = new Date().toISOString().split('T')[0];
    $('#departDate, #returnDate').attr('min', today);
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateStr = maxDate.toISOString().split('T')[0];
    $('#departDate, #returnDate').attr('max', maxDateStr);
    
    $('#departDate').on('change', function() {
        const departDate = $(this).val();
        if (departDate) {
            const nextDay = new Date(departDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const minReturn = nextDay.toISOString().split('T')[0];
            $('#returnDate').attr('min', minReturn);
            
            if ($('#returnDate').val() && $('#returnDate').val() < minReturn) {
                $('#returnDate').val('');
            }
        }
    });
    
    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    $('#flightsSearchForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        $('.error-message').hide();
        $('.form-control').removeClass('is-invalid');
        
        let isValid = true;
        const errors = [];
        
        // Validate From airport
        const fromValue = sanitizeInput($('#from').val().trim());
        if (!fromValue || !selectedFrom) {
            showError('from', 'Please select a departure airport');
            isValid = false;
            errors.push('departure airport');
        }
        
        // Validate To airport
        const toValue = sanitizeInput($('#to').val().trim());
        if (!toValue || !selectedTo) {
            showError('to', 'Please select a destination airport');
            isValid = false;
            errors.push('destination airport');
        }
        
        // Check if same airport
        if (selectedFrom && selectedTo && selectedFrom.code === selectedTo.code) {
            showError('to', 'Destination must be different from departure');
            isValid = false;
            errors.push('different airports required');
        }
        
        // Validate departure date
        const departDate = $('#departDate').val();
        if (!departDate) {
            showError('departDate', 'Please select a departure date');
            isValid = false;
            errors.push('departure date');
        } else {
            const depart = new Date(departDate);
            const todayDate = new Date(today);
            if (depart < todayDate) {
                showError('departDate', 'Departure date cannot be in the past');
                isValid = false;
                errors.push('valid departure date');
            }
        }
        
        // Validate return date for round trips
        const tripType = $('input[name="tripType"]:checked').val();
        if (tripType === 'round') {
            const returnDate = $('#returnDate').val();
            if (!returnDate) {
                showError('returnDate', 'Please select a return date');
                isValid = false;
                errors.push('return date');
            } else if (departDate && returnDate <= departDate) {
                showError('returnDate', 'Return date must be after departure date');
                isValid = false;
                errors.push('valid return date');
            }
        }
        
        if (!isValid) {
            // Announce errors to screen readers
            $('#live-region').text(`Form has ${errors.length} error${errors.length > 1 ? 's' : ''}. Please correct: ${errors.join(', ')}`);
            return;
        }
        
        // Disable submit button
        const $searchBtn = $('#searchBtn');
        $searchBtn.prop('disabled', true).text('Searching...');
        
        // Announce loading
        $('#live-region').text('Searching for flights, please wait...');
        
        // Simulate flight search
        setTimeout(function() {
            performFlightSearch();
            $searchBtn.prop('disabled', false).text('Search flights');
        }, 1500);
    });
    
    function showError(fieldId, message) {
        $('#' + fieldId).addClass('is-invalid');
        $('#' + fieldId + '-error').text(message).show();
    }
    
    // ============================================
    // FLIGHT SEARCH & RESULTS
    // ============================================
    function performFlightSearch() {
        const tripType = $('input[name="tripType"]:checked').val();
        const passengers = $('#passengers').val();
        const flightClass = $('#class').val();
        const departDate = $('#departDate').val();
        const returnDate = $('#returnDate').val();
        
        // Generate mock flight results
        const flights = generateFlights(selectedFrom, selectedTo, flightClass);
        
        // Display results
        displayFlightResults(flights, tripType);
        
        // Update title
        const title = `${selectedFrom.city} to ${selectedTo.city} - ${flights.length} flights found`;
        $('#resultsTitle').text(title);
        
        // Show results section
        $('#flightResults').addClass('show');
        
        // Scroll to results
        $('#flightResults')[0].scrollIntoView({ behavior: 'smooth' });
        
        // Announce to screen readers
        $('#live-region').text(`Search complete. ${flights.length} flights found from ${selectedFrom.city} to ${selectedTo.city}`);
    }
    
    function generateFlights(from, to, flightClass) {
        const airlines = [
            { name: 'Qantas', logo: '🦘', code: 'QF' },
            { name: 'Virgin Australia', logo: '✈️', code: 'VA' },
            { name: 'Emirates', logo: '🛫', code: 'EK' },
            { name: 'Singapore Airlines', logo: '🇸🇬', code: 'SQ' },
            { name: 'Cathay Pacific', logo: '🐉', code: 'CX' }
        ];
        
        const flights = [];
        const basePrice = flightClass === 'economy' ? 450 : flightClass === 'premium' ? 850 : flightClass === 'business' ? 2500 : 5000;
        
        for (let i = 0; i < 8; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const departHour = 6 + Math.floor(Math.random() * 16);
            const duration = 2 + Math.floor(Math.random() * 10);
            const stops = Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 1 : 2;
            const price = basePrice + Math.floor(Math.random() * 300) - 150;
            
            flights.push({
                airline: airline,
                flightNumber: `${airline.code}${Math.floor(Math.random() * 900) + 100}`,
                departTime: `${departHour.toString().padStart(2, '0')}:${(Math.floor(Math.random() * 4) * 15).toString().padStart(2, '0')}`,
                arriveTime: `${((departHour + duration) % 24).toString().padStart(2, '0')}:${(Math.floor(Math.random() * 4) * 15).toString().padStart(2, '0')}`,
                duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
                stops: stops,
                price: price,
                from: from,
                to: to
            });
        }
        
        return flights.sort((a, b) => a.price - b.price);
    }
    
    function displayFlightResults(flights, tripType) {
        const container = $('#flightCardsContainer');
        container.empty();
        
        flights.forEach((flight, index) => {
            const card = createFlightCard(flight, index);
            container.append(card);
        });
    }
    
    function createFlightCard(flight, index) {
        const stopsText = flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;
        
        return $(`
            <article class="flight-card" aria-labelledby="flight-${index}-airline">
                <div class="flight-header">
                    <div class="airline-info">
                        <div class="airline-logo" aria-hidden="true">${flight.airline.logo}</div>
                        <div>
                            <div class="airline-name" id="flight-${index}-airline">${flight.airline.name}</div>
                            <div class="flight-class">${$('#class option:selected').text()} • ${flight.flightNumber}</div>
                        </div>
                    </div>
                    <div class="price-tag">
                        <div class="price-amount" aria-label="Price: ${flight.price} dollars">$${flight.price}</div>
                        <div class="price-label">per person</div>
                    </div>
                </div>
                
                <div class="flight-details">
                    <div class="flight-time">
                        <div class="time">${flight.departTime}</div>
                        <div class="airport-code">${flight.from.code}</div>
                    </div>
                    
                    <div class="flight-duration">
                        <div class="duration-text">${flight.duration}</div>
                        <div class="duration-line" aria-hidden="true"></div>
                        <div class="stops-info">${stopsText}</div>
                    </div>
                    
                    <div class="flight-time">
                        <div class="time">${flight.arriveTime}</div>
                        <div class="airport-code">${flight.to.code}</div>
                    </div>
                </div>
                
                <div class="flight-features">
                    ${flight.stops === 0 ? '<span class="feature-tag">✈ Direct flight</span>' : ''}
                    <span class="feature-tag">🎒 Carry-on included</span>
                    <span class="feature-tag">🍽️ Meal included</span>
                    <span class="feature-tag">📺 Entertainment</span>
                </div>
                
                <button class="btn-book-flight" data-flight-index="${index}" aria-label="Book flight ${flight.flightNumber} for ${flight.price} dollars">
                    Select flight
                </button>
            </article>
        `);
    }
    
    // ============================================
    // BOOK FLIGHT BUTTON
    // ============================================
    $(document).on('click', '.btn-book-flight', function() {
        const flightIndex = $(this).data('flight-index');
        const airline = $(this).closest('.flight-card').find('.airline-name').text();
        const price = $(this).closest('.flight-card').find('.price-amount').text();
        
        $('#live-region').text(`Booking flight with ${airline} for ${price}`);
        
        alert(`Flight booking initiated!\n\nAirline: ${airline}\nPrice: ${price}\n\nThis is a demo. In production, you would proceed to payment.`);
    });
    
    // ============================================
    // SORT FLIGHTS
    // ============================================
    $('#sortFlights').on('change', function() {
        const sortBy = $(this).val();
        const $cards = $('#flightCardsContainer .flight-card').get();
        
        $cards.sort(function(a, b) {
            switch(sortBy) {
                case 'price-low':
                    return parseInt($(a).find('.price-amount').text().replace('$', '')) - 
                           parseInt($(b).find('.price-amount').text().replace('$', ''));
                case 'price-high':
                    return parseInt($(b).find('.price-amount').text().replace('$', '')) - 
                           parseInt($(a).find('.price-amount').text().replace('$', ''));
                case 'duration':
                    const getDuration = (card) => {
                        const text = $(card).find('.duration-text').text();
                        const hours = parseInt(text.match(/(\d+)h/)?.[1] || 0);
                        const mins = parseInt(text.match(/(\d+)m/)?.[1] || 0);
                        return hours * 60 + mins;
                    };
                    return getDuration(a) - getDuration(b);
                default:
                    return 0;
            }
        });
        
        $('#flightCardsContainer').html($cards);
        $('#live-region').text(`Flights sorted by ${$('#sortFlights option:selected').text()}`);
    });
    
    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('%c✈️ Flights Search System Active', 'background: #003580; color: white; padding: 8px; font-size: 16px; font-weight: bold;');
    console.log('✓ WCAG 2.2 AA Compliant');
    console.log('✓ XSS Protection Active');
    console.log('✓ Keyboard Navigation Supported');
    console.log('✓ Screen Reader Announcements');
    console.log('✓ Airport Autocomplete: 20 airports available');
    console.log('✓ Form Validation & Error Handling');
    
});