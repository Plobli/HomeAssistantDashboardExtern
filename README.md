# HomeAssistantDashboardExtern

Ein leichtgewichtiges Web-Dashboard zur externen Anzeige von Sensorwerten aus Home Assistant. Entwickelt für Informationsdisplays, Statusmonitore oder öffentliche Bildschirme.

![screenshot-website](https://github.com/Plobli/HomeAssistantDashboardExtern/blob/main/screenshot.png)

## Funktionen

- Anzeige beliebiger `sensor.*` und `binary_sensor.*` aus Home Assistant
- Konfigurierbar über `config.json`
- Darstellung als responsive Kachelübersicht
- Datenaktualisierung alle 10 Sekunden

## Technische Anforderungen

- Webserver mit PHP-Unterstützung (z. B. Apache oder Nginx)
- HTTPS-fähige Domain
- Externer Zugriff auf eine eigene Home Assistant Instanz über Domain
- Ein gültiger Home Assistant Long-Lived Access Token

## Installation

1. **Repository klonen oder herunterladen**

   ```bash
   git clone https://github.com/Plobli/HomeAssistantDashboardExtern.git
   ```

2. **Dateien auf Webserver kopieren**

   Lade den Inhalt des Repositories in ein öffentlich erreichbares Verzeichnis deines Webservers.

3. **Konfigurationsdatei anpassen**

   Öffne `config.json` und trage deine Daten ein. Beispiel:

   ```json
   {
     "host": "HOME-ASSISTANT-URL-HIER-EINTRAGEN",
     "token": "HOME-ASSISTANT-TOKEN-HIER-EINTRAGEN",
     "sensors": [
       {
         "name": "Bewegungsmelder EG",
         "entity_id": "binary_sensor.flur_bewegung"
       },
       {
         "name": "Temperatur",
         "entity_id": "sensor.wohnzimmer_temperature",
         "unit": "°C"
       }
     ]
   }
   ```
   Wichtig: Der Host muss ohne `https://` angegeben werden. Nur der reine Domainname.

   Es können beliebig viele Sensoren angezeigt werden.

   **Home Assistant Token erstellen**

   Für den Zugriff auf die Sensorwerte wird ein sogenannter Long-Lived Access Token benötigt:
   
   1. Melde dich in Home Assistant an.
   2. Gehe in dein Profil (Benutzerkonto).
   3. Scrolle nach unten zum Abschnitt "Long-Lived Access Tokens".
   4. Erstelle ein neues Token.
   5. Füge diesen Token in die Datei `config.json` ein.
   
   Weitere Informationen:  
   https://www.home-assistant.io/docs/authentication/#long-lived-access-token

5. **Domain für CORS in Home Assistant freigeben**

   Damit dein Webserver auf die Home Assistant API zugreifen darf, muss die Domain explizit freigegeben werden.

   Ergänze dazu in der `configuration.yaml` deiner Home Assistant Instanz folgenden Abschnitt:

   ```yaml
   http:
     cors_allowed_origins:
       - https://dein-dashboard-domain.de
   ```

   Dokumentation:  
   https://www.home-assistant.io/integrations/http/#cors_allowed_origins

6. **Home Assistant neu starten**

   Änderungen an der `configuration.yaml` erfordern einen Neustart von Home Assistant.

## Sicherheitshinweis

Die Datei `config.json` enthält sensible Informationen (Token). Stelle sicher, dass diese Datei nicht öffentlich im Web zugänglich ist. Du kannst dies z. B. durch eine `.htaccess`-Regel oder durch Verlagerung außerhalb des Webroots erreichen.

## Lizenz

Dieses Projekt steht unter der GNU General Public License Version 3. Weitere Informationen siehe [LICENSE](LICENSE).

## Mitwirken

Fragen, Fehler oder Vorschläge? Pull Requests und Issues sind willkommen unter:  
https://github.com/Plobli/HomeAssistantDashboardExtern
