// TeamConfigTabularView

import React, { useEffect, useState } from 'react';
import { useFetchJson } from '../../hooks/useFetchJson';
import PageTitle from '../../components/page_title/PageTitle';
import { LuPlus, LuSettings } from 'react-icons/lu';

const incomeConfigBaseUrl = '/api/v1/config/income';
const ranks = ['RANK_2', 'RANK_3', 'RANK_4', 'RANK_5'];
const levelLabels = { 1: 'Lv.A / Depth-1', 2: 'Lv.B / Depth-2', 3: 'Lv.C / Depth-3' };

export default function TeamConfigTabularView() {
    const [teamConfigRaw, setTeamConfigRaw] = useState([]);
    const [pivotedData, setPivotedData] = useState({ 1: {}, 2: {}, 3: {} });
    const [teamChanged, setTeamChanged] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    useEffect(() => {
        loadTeamRebateConfig();
    }, []);

    const loadTeamRebateConfig = async () => {
        const resp = await fetch(`${incomeConfigBaseUrl}/team`);
        const data = await resp.json();
        setTeamConfigRaw(data);
        setPivotedData(pivotTeamData(data));
        setTeamChanged(false);
    };

    const pivotTeamData = (raw) => {
        const pivot = { 1: {}, 2: {}, 3: {} };
        raw.forEach(entry => {
            if (!entry.incomePercentages) return;
            Object.entries(entry.incomePercentages).forEach(([level, value]) => {
                pivot[level][entry.rank] = value;
            });
        });
        return pivot;
    };

    const handlePivotChange = (rank, level, value) => {
        setPivotedData(prev => ({
            ...prev,
            [level]: {
                ...prev[level],
                [rank]: +value
            }
        }));
        setTeamChanged(true);
    };

    const updateTeamData = async () => {
        const unpivoted = ranks.map(rank => ({
            rank,
            incomePercentages: {
                1: pivotedData[1][rank] || 0,
                2: pivotedData[2][rank] || 0,
                3: pivotedData[3][rank] || 0
            }
        }));

        const resp = await fetch(`${incomeConfigBaseUrl}/team`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unpivoted)
        });

        if (resp.ok) {
            alert('Team config updated successfully');
            setTeamChanged(false);
        } else {
            alert('Team config update failed');
        }
    };

    return (
        <section>
            <div className="rank-header">
                <h2>Team Income Config Editor</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Level</th>
                        {ranks.map(rank => <th key={rank}>{rank}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map(level => (
                        <tr key={level}>
                            <td>{levelLabels[level]}</td>
                            {ranks.map(rank => (
                                <td key={rank}>
                                    <input
                                        type="number"
                                        value={pivotedData[level]?.[rank] ?? 0}
                                        onChange={e => handlePivotChange(rank, level, e.target.value)}
                                        step="0.01"
                                        min={0}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={updateTeamData} className="update-button" disabled={!teamChanged}>Update</button>


        </section>

    );
}
