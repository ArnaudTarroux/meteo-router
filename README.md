## Meteo-router

Meteo-router est un service qui permet de déterminer la météo sur un trajet en fonction des adresses de départ et d'arrivé et de l'heure de départ.

### Installation

Une fois le dépôt cloné, installez les dépendances avec la commande suivante:

```bash
npm install
```

Copier le fichier `.env.tpl` en `.env` et renseignez vos clés API nécéssaires.

### Démarrage du serveur
Pour démarrer le serveur, utilisez la commande suivante:

```bash
npm run start
```

OU pour démarrer en mode développement avec rechargement automatique:
```bash
npm run start:dev
```

### Utilisation

Pour utiliser le service vous devez envoyer une requête GET à l'endpoint `/route-weather` avec les paramètres suivants:
- `from`: Adresse de départ (string)
- `to`: Adresse d'arrivée (string)
- `departure`: Date et heure de départ (ex: `2026-01-03 07:30:00`)

```http request
localhost:3000/route-weather?from=métro compans caffarelli toulouse&to=Bagnère de Luchon&departure=2026-01-03 07:30:00
```

### Réponse:

Les points de passage incluent les informations météorologiques estimées au moment du passage à chaque point le long de l'itinéraire.
Pour infos, ils sont triés du point d'arrivée au point de départ.

```json
{
    "distance": 145057.6, // en mètres
    "duration": 6874.8, // en secondes
    "waypoints": [
        {
            "location": {
                "lat": 42.798869,
                "lng": 0.596163
            },
            "passageDatetime": "2026-01-03T08:23:50.925Z",
            "weather": {
                "temperature": 1.6, // en degrés Celsius
                "weatherCondition": "rain",
                "precipitationProbability": 40, // en pourcentage
                "windSpeed": 3.3 // en km/h
            }
        },
        {
            "location": {
                "lat": 42.958974,
                "lng": 0.632869
            },
            "passageDatetime": "2026-01-03T07:57:19.035Z",
            "weather": {
                "temperature": 1.5,
                "weatherCondition": "rain",
                "precipitationProbability": 53,
                "windSpeed": 0.7
            }
        },
        {
            "location": {
                "lat": 43.107978,
                "lng": 0.611222
            },
            "passageDatetime": "2026-01-03T07:34:56.097Z",
            "weather": {
                "temperature": 1.1,
                "weatherCondition": "cloudy",
                "precipitationProbability": 67,
                "windSpeed": 1.5
            }
        },
        {
            "location": {
                "lat": 43.129834,
                "lng": 0.852644
            },
            "passageDatetime": "2026-01-03T07:23:07.990Z",
            "weather": {
                "temperature": 1.5,
                "weatherCondition": "drizzle",
                "precipitationProbability": 77,
                "windSpeed": 3
            }
        },
        {
            "location": {
                "lat": 43.21008,
                "lng": 1.029062
            },
            "passageDatetime": "2026-01-03T07:06:58.062Z",
            "weather": {
                "temperature": 1.4,
                "weatherCondition": "drizzle",
                "precipitationProbability": 83,
                "windSpeed": 2.6
            }
        },
        {
            "location": {
                "lat": 43.346681,
                "lng": 1.263365
            },
            "passageDatetime": "2026-01-03T07:02:00.539Z",
            "weather": {
                "temperature": 2.2,
                "weatherCondition": "cloudy",
                "precipitationProbability": 68,
                "windSpeed": 1.3
            }
        },
        {
            "location": {
                "lat": 43.507294,
                "lng": 1.355406
            },
            "passageDatetime": "2026-01-03T06:49:36.729Z",
            "weather": {
                "temperature": 4.1,
                "weatherCondition": "cloudy",
                "precipitationProbability": 30,
                "windSpeed": 2.6
            }
        }
    ]
}
```
