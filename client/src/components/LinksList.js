import React from 'react'
import {Link} from 'react-router-dom';

export const LinksList = ({links}) => {
	if (!links.length) {
		return <p className="center-align">Ви ще не додали жодного посилання</p>
	}

	return (
		<table className="striped">
			<thead>
				<tr>
					<th>№</th>
					<th>Оригінальне посилання</th>
					<th>Скорочене посилання</th>
					<th>Детальніше</th>
				</tr>
			</thead>
			<tbody>
			{links.map((link, idx) =>
				<tr key={link._id}>
					<td>{idx + 1}</td>
					<td>{link.from}</td>
					<td>{link.to}</td>
					<td><Link to={`/detail/${link._id}`}>Відкрити</Link></td>
				</tr>
			)}
			</tbody>
		</table>
	)
}
