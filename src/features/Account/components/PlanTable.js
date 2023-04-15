import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "../../../styles/PlanSubscription.css"


function createData(spec, mobile, basic, standard, premium) {
    return { spec, mobile, basic, standard, premium };
}

const rows = [
    createData('Monthly Price', '12€', '14€', '16€', '19€'),
    createData('Video Quality', 'Good', 'Good', 'Better', 'Best'),
    createData('Resolution', '480p', '480p', '1080p', '4K+HDR'),
    createData('Watch on your TV and computer', 0, 1, 1, 1),
    createData('Watch on your mobile phone and tablet', 1, 1, 1, 1),
    createData('Screens you can watch on at the same time', '1', '1', '2', '4'),
    createData('Unlimited movies and TV shows', 1, 1, 1, 1),
    createData('Cancel Anytime', 1, 1, 1, 1),
];

export default function PlanTable({ plan, setPlan }) {
    var c1, c2, c3, c4;
    if (plan === 1) {
        c1 = 'red'
        c2 = '#757575'
        c3 = '#757575'
        c4 = '#757575'
    }
    if (plan === 2) {
        c2 = 'red'
        c1 = '#757575'
        c3 = '#757575'
        c4 = '#757575'
    }
    if (plan === 3) {
        c3 = 'red'
        c1 = '#757575'
        c2 = '#757575'
        c4 = '#757575'
    }
    if (plan === 4) {
        c4 = 'red'
        c2 = '#757575'
        c3 = '#757575'
        c1 = '#757575'
    }

    return (
        <table className='plan-table'>
            <thead>
                <tr>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan(1)}>Mobile</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan(2)}>Basic</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan(3)}>Standard</th>
                    <th></th>
                    <th className='plan-table-th' onClick={() => setPlan(4)}>Premium</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row) => (
                        <tr key={row.spec}>
                            <td>{row.spec}</td>
                            <td className='plan_table_td' style={{ color: `${c1}` }}>{typeof (row.mobile) == 'number' ? row.mobile ? <CheckIcon /> : <CloseIcon /> : row.mobile}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c2}` }}>{typeof (row.basic) == 'number' ? row.basic ? <CheckIcon /> : <CloseIcon /> : row.basic}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c3}` }}>{typeof (row.standard) == 'number' ? row.standard ? <CheckIcon /> : <CloseIcon /> : row.standard}</td>
                            <td></td>
                            <td className='plan_table_td' style={{ color: `${c4}` }}>{typeof (row.premium) == 'number' ? row.premium ? <CheckIcon /> : <CloseIcon /> : row.premium}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table >
    );
}
