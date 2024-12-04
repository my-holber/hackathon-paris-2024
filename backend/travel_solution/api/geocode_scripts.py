from geopy.geocoders import Nominatim

def get_country_from_coordinates(latitude, longitude):
    """
    Retourne le pays correspondant aux coordonnées fournies.
    
    :param latitude: La latitude (float)
    :param longitude: La longitude (float)
    :return: Le nom du pays (str) ou None si non trouvé
    """
    geolocator = Nominatim(user_agent="my_travel_solution_app")
    location = geolocator.reverse((latitude, longitude), exactly_one=True)
    if location and 'country' in location.raw['address']:
        return location.raw['address']['country']
    return None
