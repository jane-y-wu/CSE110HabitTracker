import firebase from 'firebase';
import { isLoggedIn } from './isLoggedIn';
import { db } from '../config/db';

/*
 * Adds a habit to the database under the current user.
 * Habit value: uid, incentives, privacy, priority, notif, alerts.
 */
export const addHabit = (habit) => {
  db.ref(firebase.auth().currentUser.uid +'/Habits/' + habit.name).set({
    incentive: habit.incentive,
    priority: habit.priority,
    reminders: habit.reminders,
    alerts: habit.alerts,
    private: habit.private,
    completed: habit.completed,
    description: habit.description
  })
}
// uid, incentives, privacy, priority, notif, alerts
