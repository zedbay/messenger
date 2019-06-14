CREATE (Michael:User { name: 'Scott', firstName: 'Michael', email: 'sm@gmail.com', password: 'a', city: 'Scranton', entitled: 'Boss', birthDate: '2019-04-09T22:00:00.000Z', photo: 'sm.jpg'})
CREATE (Dwight:User { name: 'Schrute', firstName: 'Dwight', email: 'sd@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'sd.jpeg'})
CREATE (Jim:User { name: 'Halpert', firstName: 'Jim', email: 'hj@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hj.jpg'})
CREATE (Pam:User { name: 'Beesly', firstName: 'Pam', email: 'bp@gmail.com', password: 'a', city: 'Scranton', entitled: 'Receptionist', birthDate: '2019-04-09T22:00:00.000Z', photo: 'bp.jpg'})
CREATE (Ryan:User { name: 'Howard', firstName: 'Ryan', email: 'hr@gmail.com', password: 'a', city: 'Scranton', entitled: 'Temporary worker', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hr.jpg'})
CREATE (Andy:User { name: 'Bernard', firstName: 'Andy', email: 'ba@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ba.jpg'})
CREATE (Stanley:User { name: 'Hudson', firstName: 'Stanley', email: 'hs@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'hs.jpg'})
CREATE (Kevin:User { name: 'Malone', firstName: 'Kevin', email: 'mk@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'mk.jpg'})
CREATE (Angela:User { name: 'Martin', firstName: 'Angela', email: 'ma@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ma.jpg'})
CREATE (Oscar:User { name: 'Martinez', firstName: 'Oscar', email: 'mo@gmail.com', password: 'a', city: 'Scranton', entitled: 'Accountant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'mo.jpg'})
CREATE (Phyllis:User { name: 'Lapin', firstName: 'Phyllis', email: 'lp@gmail.com', password: 'a', city: 'Scranton', entitled: 'Commercial', birthDate: '2019-04-09T22:00:00.000Z', photo: 'lp.jpg'})
CREATE (Kelly:User { name: 'Kapoor', firstName: 'Kelly', email: 'kk@gmail.com', password: 'a', city: 'Scranton', entitled: 'Communication', birthDate: '2019-04-09T22:00:00.000Z', photo: 'kk.jpg'})
CREATE (Creed:User { name: 'Bratton', firstName: 'Creed', email: 'bc@gmail.com', password: 'a', city: 'Scranton', entitled: 'Quality control', birthDate: '2019-04-09T22:00:00.000Z', photo: 'br.jpg'})
CREATE (Toby:User { name: 'Flenderson', firstName: 'Toby', email: 'ft@gmail.com', password: 'a', city: 'Scranton', entitled: 'Social assistant', birthDate: '2019-04-09T22:00:00.000Z', photo: 'ft.jpg'})
CREATE (Darryl:User { name: 'Philbin', firstName: 'Darryl', email: 'pd@gmail.com', password: 'a', city: 'Scranton', entitled: 'Worker', birthDate: '2019-04-09T22:00:00.000Z', photo: 'pd.jpeg'})


MATCH (m:Message), (s:Serveur { name: "Welcome" }), (u:User) WHERE (m)-[:IN]->(s) AND (u)-[:SEND]->(m) RETURN u, m