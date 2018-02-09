select
	strftime('%Y-%m', days.date) as month,
	sum(tasks.time) as time
	--*
from
	tasks
	join
	days
		on
		days.id = tasks.dayId
group by
	month
order by
	month