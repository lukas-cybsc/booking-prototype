/* ============================================
   Booking.com Improved Prototype - index-script.js
   WITH SIMULATED AUSTRALIAN PROPERTIES
   ============================================ */

// Australian Properties Database
const australianProperties = [
    // SYDNEY PROPERTIES
    {
        id: 1,
        name: "Sydney Harbour View Hotel",
        city: "Sydney",
        location: "The Rocks, Sydney CBD",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        price: 245,
        stars: 5,
        rating: 9.2,
        reviews: 1284,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view", "balcony"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 2,
        name: "The Grand Sydney",
        city: "Sydney",
        location: "Darling Harbour",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        price: 189,
        stars: 4,
        rating: 8.7,
        reviews: 892,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "pool"],
        bed: "double",
        meal: "none",
        bathroom: "private",
        features: ["ac"],
        accessibility: ["elevator", "wheelchair"],
        urgent: true
    },
    {
        id: 3,
        name: "Circular Quay Apartment",
        city: "Sydney",
        location: "Sydney CBD",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        price: 320,
        stars: 5,
        rating: 9.5,
        reviews: 456,
        cancellation: "free",
        type: "apartment",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "kitchen",
        bathroom: "private",
        features: ["ac", "view", "balcony"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 4,
        name: "Bondi Beach Resort",
        city: "Sydney",
        location: "Bondi Beach",
        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
        price: 280,
        stars: 4,
        rating: 8.9,
        reviews: 678,
        cancellation: "free",
        type: "resort",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view", "balcony"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 5,
        name: "Sydney Budget Inn",
        city: "Sydney",
        location: "Central Sydney",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
        price: 95,
        stars: 3,
        rating: 7.8,
        reviews: 432,
        cancellation: "paid",
        type: "hotel",
        amenities: ["wifi"],
        bed: "twin",
        meal: "none",
        bathroom: "private",
        features: ["ac"],
        accessibility: [],
        urgent: true
    },

    // MELBOURNE PROPERTIES
    {
        id: 6,
        name: "Melbourne Crown Hotel",
        city: "Melbourne",
        location: "Southbank",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
        price: 215,
        stars: 5,
        rating: 9.1,
        reviews: 1156,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator", "wheelchair"],
        urgent: false
    },
    {
        id: 7,
        name: "Yarra River Apartments",
        city: "Melbourne",
        location: "CBD",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
        price: 175,
        stars: 4,
        rating: 8.6,
        reviews: 723,
        cancellation: "free",
        type: "apartment",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "kitchen",
        bathroom: "private",
        features: ["ac", "balcony"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 8,
        name: "Federation Square Hotel",
        city: "Melbourne",
        location: "Melbourne CBD",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
        price: 135,
        stars: 3,
        rating: 8.2,
        reviews: 891,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi"],
        bed: "twin",
        meal: "none",
        bathroom: "private",
        features: ["ac"],
        accessibility: ["elevator"],
        urgent: true
    },

    // BRISBANE PROPERTIES
    {
        id: 9,
        name: "Brisbane River Resort",
        city: "Brisbane",
        location: "South Bank",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        price: 198,
        stars: 4,
        rating: 8.8,
        reviews: 645,
        cancellation: "free",
        type: "resort",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view", "balcony"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 10,
        name: "Queen Street Suites",
        city: "Brisbane",
        location: "Brisbane CBD",
        image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
        price: 145,
        stars: 4,
        rating: 8.4,
        reviews: 534,
        cancellation: "free",
        type: "apartment",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "kitchen",
        bathroom: "private",
        features: ["ac"],
        accessibility: ["elevator"],
        urgent: false
    },

    // GOLD COAST PROPERTIES
    {
        id: 11,
        name: "Surfers Paradise Beachfront",
        city: "Gold Coast",
        location: "Surfers Paradise",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        price: 225,
        stars: 5,
        rating: 9.3,
        reviews: 987,
        cancellation: "free",
        type: "resort",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view", "balcony"],
        accessibility: ["elevator", "wheelchair"],
        urgent: false
    },
    {
        id: 12,
        name: "Broadbeach Apartments",
        city: "Gold Coast",
        location: "Broadbeach",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        price: 165,
        stars: 4,
        rating: 8.5,
        reviews: 432,
        cancellation: "free",
        type: "apartment",
        amenities: ["wifi", "pool"],
        bed: "double",
        meal: "kitchen",
        bathroom: "private",
        features: ["ac", "balcony"],
        accessibility: ["elevator"],
        urgent: true
    },

    // PERTH PROPERTIES
    {
        id: 13,
        name: "Perth Waterfront Hotel",
        city: "Perth",
        location: "Perth CBD",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        price: 185,
        stars: 4,
        rating: 8.7,
        reviews: 567,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 14,
        name: "Fremantle Boutique Hotel",
        city: "Perth",
        location: "Fremantle",
        image: "https://images.unsplash.com/photo-1559508551-44bff1de756b?w=800&q=80",
        price: 155,
        stars: 4,
        rating: 8.9,
        reviews: 389,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac"],
        accessibility: [],
        urgent: false
    },

    // ADELAIDE PROPERTIES
    {
        id: 15,
        name: "Adelaide Central Plaza",
        city: "Adelaide",
        location: "Adelaide CBD",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
        price: 125,
        stars: 3,
        rating: 8.1,
        reviews: 456,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "none",
        bathroom: "private",
        features: ["ac"],
        accessibility: ["elevator"],
        urgent: false
    },
    {
        id: 16,
        name: "Glenelg Beach Resort",
        city: "Adelaide",
        location: "Glenelg",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        price: 175,
        stars: 4,
        rating: 8.6,
        reviews: 534,
        cancellation: "free",
        type: "resort",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator"],
        urgent: true
    },

    // CAIRNS PROPERTIES
    {
        id: 17,
        name: "Cairns Reef Hotel",
        city: "Cairns",
        location: "Cairns Esplanade",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        price: 195,
        stars: 4,
        rating: 8.8,
        reviews: 678,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator"],
        urgent: false
    },

    // CANBERRA PROPERTIES
    {
        id: 18,
        name: "National Capital Hotel",
        city: "Canberra",
        location: "Canberra CBD",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
        price: 145,
        stars: 4,
        rating: 8.3,
        reviews: 423,
        cancellation: "free",
        type: "hotel",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac"],
        accessibility: ["elevator", "wheelchair"],
        urgent: false
    },

    // HOBART PROPERTIES
    {
        id: 19,
        name: "Hobart Waterfront Suites",
        city: "Hobart",
        location: "Hobart Waterfront",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        price: 165,
        stars: 4,
        rating: 9.0,
        reviews: 345,
        cancellation: "free",
        type: "apartment",
        amenities: ["wifi", "parking"],
        bed: "double",
        meal: "kitchen",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator"],
        urgent: false
    },

    // DARWIN PROPERTIES
    {
        id: 20,
        name: "Darwin Harbour Resort",
        city: "Darwin",
        location: "Darwin Waterfront",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        price: 175,
        stars: 4,
        rating: 8.5,
        reviews: 289,
        cancellation: "free",
        type: "resort",
        amenities: ["wifi", "pool", "parking"],
        bed: "double",
        meal: "breakfast",
        bathroom: "private",
        features: ["ac", "view"],
        accessibility: ["elevator"],
        urgent: false
    }
];

// Current filtered properties
let currentProperties = [...australianProperties];
let currentCity = "Sydney";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize with Sydney properties
    displayProperties(currentProperties.filter(p => p.city === currentCity));
    
    /* ============================================
       SECURITY UTILITIES
       ============================================ */
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML.trim();
    }
    
    function validateDestination(destination) {
        const pattern = /^[a-zA-Z0-9\s\-,.']{2,100}$/;
        return pattern.test(destination) && destination.length >= 2 && destination.length <= 100;
    }
    
    function validateDates(checkIn, checkOut) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            return { valid: false, message: 'Invalid date format' };
        }
        
        if (checkInDate < today) {
            return { valid: false, message: 'Check-in date cannot be in the past' };
        }
        
        if (checkOutDate <= checkInDate) {
            return { valid: false, message: 'Check-out date must be after check-in date' };
        }
        
        const maxDate = new Date(today);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        
        if (checkInDate > maxDate) {
            return { valid: false, message: 'Check-in date too far in the future' };
        }
        
        return { valid: true };
    }
    
    /* ============================================
       DISPLAY PROPERTIES FUNCTION
       ============================================ */
    function displayProperties(properties) {
        const container = document.getElementById('properties-container');
        const skeletonLoader = document.getElementById('skeleton-loader');
        
        // Hide skeleton loader when displaying properties
        if (skeletonLoader) {
            skeletonLoader.classList.remove('active');
            skeletonLoader.style.display = 'none';
        }
        
        container.innerHTML = '';
        
        properties.forEach(property => {
            const card = createPropertyCard(property);
            container.appendChild(card);
        });
        
        // Update results count
        const resultsHeader = document.getElementById('results-count');
        resultsHeader.textContent = `${currentCity}: ${properties.length} properties found`;
    }
    
    /* ============================================
       CREATE PROPERTY CARD
       ============================================ */
    function createPropertyCard(property) {
        const article = document.createElement('article');
        article.className = 'property-card';
        article.setAttribute('data-price', property.price);
        article.setAttribute('data-stars', property.stars);
        article.setAttribute('data-rating', property.rating);
        article.setAttribute('data-cancellation', property.cancellation);
        article.setAttribute('data-type', property.type);
        article.setAttribute('data-amenities', property.amenities.join(','));
        article.setAttribute('data-bed', property.bed);
        article.setAttribute('data-meal', property.meal);
        article.setAttribute('data-bathroom', property.bathroom);
        article.setAttribute('data-features', property.features.join(','));
        article.setAttribute('data-accessibility', property.accessibility.join(','));
        article.setAttribute('tabindex', '0');
        
        // Rating text
        let ratingText = 'Good';
        if (property.rating >= 9) ratingText = 'Wonderful';
        else if (property.rating >= 8.5) ratingText = 'Excellent';
        else if (property.rating >= 8) ratingText = 'Very Good';
        
        // Message tag
        let messageTag = '';
        if (property.urgent) {
            messageTag = '<span class="message-tag message-urgency">⚠ Only 2 rooms left at this price!</span>';
        } else if (property.cancellation === 'free') {
            messageTag = '<span class="message-tag message-success">✓ Free cancellation</span>';
        }
        
        article.innerHTML = `
            <div class="property-image-container">
                <img 
                    src="${property.image}" 
                    alt="${property.name} - ${property.location}"
                    class="property-image"
                    loading="lazy"
                >
            </div>
            
            <div class="property-details">
                <h3 class="property-name-heading">
                    <a href="#" class="property-name">${property.name}</a>
                </h3>
                <p class="property-location">${property.location}</p>
                
                <div class="property-rating">
                    <span class="rating-badge">${property.rating}</span>
                    <span class="rating-text">${ratingText}</span>
                    <span class="rating-count">(${property.reviews} reviews)</span>
                </div>
                
                <div class="property-amenities">
                    ${property.amenities.includes('wifi') ? '<span class="amenity-tag">Free WiFi</span>' : ''}
                    ${property.amenities.includes('pool') ? '<span class="amenity-tag">Pool</span>' : ''}
                    ${property.amenities.includes('parking') ? '<span class="amenity-tag">Parking</span>' : ''}
                    ${property.meal === 'breakfast' ? '<span class="amenity-tag">Breakfast</span>' : ''}
                </div>
                
                <div class="property-messages">
                    ${messageTag}
                </div>
            </div>
            
            <div class="property-pricing">
                <div class="price-container">
                    <p class="price-label">1 night, 2 adults</p>
                    <p class="price-value">$${property.price}</p>
                    <p class="price-taxes">+$${Math.round(property.price * 0.15)} taxes and charges</p>
                </div>
                <button class="btn-availability" aria-label="See availability for ${property.name}">See availability</button>
            </div>
        `;
        
        return article;
    }
    
    /* ============================================
       SEARCH FORM HANDLER
       ============================================ */
    const searchForm = document.getElementById('search-form');
    const liveRegion = document.getElementById('live-region');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = sanitizeInput(document.getElementById('destination').value);
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;
            
            // Validate inputs
            if (!validateDestination(destination)) {
                alert('Please enter a valid destination');
                return;
            }
            
            if (!checkIn || !checkOut) {
                alert('Please fill in all required fields');
                return;
            }
            
            const dateValidation = validateDates(checkIn, checkOut);
            if (!dateValidation.valid) {
                alert(dateValidation.message);
                return;
            }
            
            // Show skeleton loader
            const skeletonLoader = document.getElementById('skeleton-loader');
            if (skeletonLoader) {
                skeletonLoader.style.display = 'flex';
                skeletonLoader.classList.add('active');
            }
            
            // Hide properties container during loading
            const container = document.getElementById('properties-container');
            if (container) {
                container.style.display = 'none';
            }
            
            // Find matching city
            const matchedCity = australianProperties.find(p => 
                p.city.toLowerCase() === destination.toLowerCase()
            );
            
            if (matchedCity) {
                currentCity = matchedCity.city;
            } else {
                currentCity = destination;
            }
            
            // Filter properties by city
            setTimeout(function() {
                const cityProperties = australianProperties.filter(p => 
                    p.city.toLowerCase() === currentCity.toLowerCase()
                );
                
                // Show properties container again
                if (container) {
                    container.style.display = 'block';
                }
                
                if (cityProperties.length > 0) {
                    currentProperties = cityProperties;
                    displayProperties(applyAllFilters(currentProperties));
                } else {
                    // If no exact match, show Sydney as default
                    currentCity = "Sydney";
                    currentProperties = australianProperties.filter(p => p.city === "Sydney");
                    displayProperties(applyAllFilters(currentProperties));
                    alert('No properties found for that location. Showing Sydney results.');
                }
                
                if (liveRegion) {
                    liveRegion.textContent = `Search complete. ${currentProperties.length} properties found in ${currentCity}.`;
                }
                
                // Scroll to results
                document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        });
    }
    
    /* ============================================
       FILTER APPLICATION
       ============================================ */
    function applyAllFilters(properties) {
        const activeFilters = {
            price: [],
            stars: [],
            rating: [],
            cancellation: [],
            type: [],
            amenity: [],
            bed: [],
            meal: [],
            bathroom: [],
            features: [],
            accessibility: []
        };
        
        // Collect active filters
        document.querySelectorAll('.filter-option input[type="checkbox"]:checked').forEach(checkbox => {
            const filterType = checkbox.getAttribute('data-filter-type');
            const filterValue = checkbox.value;
            if (activeFilters[filterType]) {
                activeFilters[filterType].push(filterValue);
            }
        });
        
        // Filter properties
        return properties.filter(property => {
            // Price filter
            if (activeFilters.price.length > 0) {
                let priceMatch = false;
                activeFilters.price.forEach(range => {
                    if (range === 'low' && property.price < 150) priceMatch = true;
                    if (range === 'mid' && property.price >= 150 && property.price <= 300) priceMatch = true;
                    if (range === 'high' && property.price > 300) priceMatch = true;
                });
                if (!priceMatch) return false;
            }
            
            // Star rating filter
            if (activeFilters.stars.length > 0) {
                if (!activeFilters.stars.includes(property.stars.toString())) return false;
            }
            
            // Guest review score filter
            if (activeFilters.rating.length > 0) {
                let ratingMatch = false;
                activeFilters.rating.forEach(minRating => {
                    if (property.rating >= parseFloat(minRating)) ratingMatch = true;
                });
                if (!ratingMatch) return false;
            }
            
            // Cancellation filter
            if (activeFilters.cancellation.length > 0) {
                if (!activeFilters.cancellation.includes(property.cancellation)) return false;
            }
            
            // Property type filter
            if (activeFilters.type.length > 0) {
                if (!activeFilters.type.includes(property.type)) return false;
            }
            
            // Amenities filter
            if (activeFilters.amenity.length > 0) {
                let amenityMatch = false;
                activeFilters.amenity.forEach(amenity => {
                    if (property.amenities.includes(amenity)) amenityMatch = true;
                });
                if (!amenityMatch) return false;
            }
            
            // Bed filter
            if (activeFilters.bed.length > 0) {
                if (!activeFilters.bed.includes(property.bed)) return false;
            }
            
            // Meal filter
            if (activeFilters.meal.length > 0) {
                if (!activeFilters.meal.includes(property.meal)) return false;
            }
            
            // Bathroom filter
            if (activeFilters.bathroom.length > 0) {
                if (!activeFilters.bathroom.includes(property.bathroom)) return false;
            }
            
            // Features filter
            if (activeFilters.features.length > 0) {
                let featureMatch = false;
                activeFilters.features.forEach(feature => {
                    if (property.features.includes(feature)) featureMatch = true;
                });
                if (!featureMatch) return false;
            }
            
            // Accessibility filter
            if (activeFilters.accessibility.length > 0) {
                let accessMatch = false;
                activeFilters.accessibility.forEach(access => {
                    if (property.accessibility.includes(access)) accessMatch = true;
                });
                if (!accessMatch) return false;
            }
            
            return true;
        });
    }
    
    /* ============================================
       FILTER CHANGE HANDLERS
       ============================================ */
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const skeletonLoader = document.getElementById('skeleton-loader');
            const container = document.getElementById('properties-container');
            
            if (skeletonLoader) {
                skeletonLoader.style.display = 'flex';
                skeletonLoader.classList.add('active');
            }
            
            if (container) {
                container.style.display = 'none';
            }
            
            setTimeout(function() {
                if (container) {
                    container.style.display = 'block';
                }
                
                const filteredProperties = applyAllFilters(currentProperties);
                displayProperties(filteredProperties);
                
                if (liveRegion) {
                    liveRegion.textContent = `Filters applied. ${filteredProperties.length} properties found.`;
                }
            }, 400);
        });
    });
    
    /* ============================================
       PROGRESSIVE FILTER DISCLOSURE
       ============================================ */
    const toggleFiltersBtn = document.getElementById('toggle-filters');
    const secondaryFilters = document.getElementById('secondary-filters');
    
    if (toggleFiltersBtn && secondaryFilters) {
        toggleFiltersBtn.addEventListener('click', function() {
            const isExpanded = secondaryFilters.classList.contains('expanded');
            
            if (isExpanded) {
                secondaryFilters.classList.remove('expanded');
                toggleFiltersBtn.textContent = 'Show all filters';
                toggleFiltersBtn.setAttribute('aria-expanded', 'false');
            } else {
                secondaryFilters.classList.add('expanded');
                toggleFiltersBtn.textContent = 'Show fewer filters';
                toggleFiltersBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }
    
    /* ============================================
       SORT DROPDOWN
       ============================================ */
    const sortDropdown = document.querySelector('.sort-dropdown');
    
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProperties = [...currentProperties];
            
            const skeletonLoader = document.getElementById('skeleton-loader');
            const container = document.getElementById('properties-container');
            
            if (skeletonLoader) {
                skeletonLoader.style.display = 'flex';
                skeletonLoader.classList.add('active');
            }
            
            if (container) {
                container.style.display = 'none';
            }
            
            setTimeout(function() {
                switch(sortValue) {
                    case 'price-low':
                        sortedProperties.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        sortedProperties.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        sortedProperties.sort((a, b) => b.rating - a.rating);
                        break;
                    default:
                        // recommended - keep original order
                        break;
                }
                
                if (container) {
                    container.style.display = 'block';
                }
                
                displayProperties(applyAllFilters(sortedProperties));
            }, 600);
        });
    }
    
    /* ============================================
       DATE VALIDATION
       ============================================ */
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        checkOutInput.setAttribute('min', today);
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        const maxDateStr = maxDate.toISOString().split('T')[0];
        checkInInput.setAttribute('max', maxDateStr);
        checkOutInput.setAttribute('max', maxDateStr);
        
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            if (isNaN(checkInDate.getTime())) {
                alert('Invalid check-in date');
                this.value = '';
                return;
            }
            
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            const minCheckOut = nextDay.toISOString().split('T')[0];
            checkOutInput.setAttribute('min', minCheckOut);
            
            if (checkOutInput.value && checkOutInput.value < minCheckOut) {
                checkOutInput.value = '';
            }
        });
        
        checkOutInput.addEventListener('change', function() {
            const validation = validateDates(checkInInput.value, this.value);
            if (!validation.valid) {
                alert(validation.message);
                this.value = '';
            }
        });
    }
    
    /* ============================================
       SKIP LINK FUNCTIONALITY
       ============================================ */
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
            
            mainContent.addEventListener('blur', function() {
                mainContent.removeAttribute('tabindex');
            }, { once: true });
        });
    }
    
    /* ============================================
       IMAGE ERROR HANDLING
       ============================================ */
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-family="Arial"%3EImage unavailable%3C/text%3E%3C/svg%3E';
            e.target.alt = 'Image not available';
        }
    }, true);
    
    /* ============================================
       CONSOLE LOG
       ============================================ */
    console.log('%c Booking.com Australian Properties Prototype ', 'background: #003580; color: #fff; padding: 5px;');
    console.log('✓ 20 Australian properties across 10 major cities');
    console.log('✓ Real-time filtering and search functionality');
    console.log('✓ Progressive filter disclosure');
    console.log('✓ WCAG 2.1 AA accessibility compliance');
    console.log('Cities available: Sydney, Melbourne, Brisbane, Gold Coast, Perth, Adelaide, Cairns, Canberra, Hobart, Darwin');
    
});