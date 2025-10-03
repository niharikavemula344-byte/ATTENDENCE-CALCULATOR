function calculateAttendance() {
    // 1. Get Input Values
    const totalClasses = parseInt(document.getElementById('total-classes').value);
    const attendedClasses = parseInt(document.getElementById('classes-attended').value);
    const requiredPercentage = parseFloat(document.getElementById('required-percentage').value);

    // 2. Get Output Elements
    const actionNeededElement = document.getElementById('action-needed');
    const currentFractionElement = document.getElementById('current-fraction');
    const currentPercentageElement = document.getElementById('current-percentage');
    const requiredFractionElement = document.getElementById('required-fraction');
    const requiredPercentageDisplayElement = document.getElementById('required-percentage-display');

    // 3. Validation
    if (isNaN(totalClasses) || isNaN(attendedClasses) || totalClasses < 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
        actionNeededElement.textContent = 'Please enter valid numbers. Attended cannot be more than total.';
        currentFractionElement.textContent = '--/--';
        currentPercentageElement.textContent = '--%';
        requiredFractionElement.textContent = '--/--';
        requiredPercentageDisplayElement.textContent = '--%';
        return;
    }

    // 4. Handle 0 Classes
    if (totalClasses === 0) {
        actionNeededElement.textContent = 'Welcome! Start attending your classes now.';
        currentFractionElement.textContent = '0/0';
        currentPercentageElement.textContent = '0.00%';
        requiredFractionElement.textContent = '0/0';
        requiredPercentageDisplayElement.textContent = `${requiredPercentage.toFixed(2)}%`;
        return;
    }

    // 5. Perform Calculations
    const currentPercentage = (attendedClasses / totalClasses) * 100;

    // Calculate the number of classes needed to reach the target attendance
    // Formula: (attendedClasses + x) / (totalClasses + x) >= requiredPercentage / 100
    // Simplified: (attendedClasses + x) * 100 >= (totalClasses + x) * requiredPercentage
    // 100 * attendedClasses + 100x >= requiredPercentage * totalClasses + requiredPercentage * x
    // 100x - requiredPercentage * x >= requiredPercentage * totalClasses - 100 * attendedClasses
    // x * (100 - requiredPercentage) >= requiredPercentage * totalClasses - 100 * attendedClasses
    // x >= (requiredPercentage * totalClasses - 100 * attendedClasses) / (100 - requiredPercentage)
    const classesNeeded = Math.ceil((requiredPercentage * totalClasses - 100 * attendedClasses) / (100 - requiredPercentage));

    // Calculate the number of classes you can skip
    // Formula: attendedClasses / (totalClasses + x) >= requiredPercentage / 100
    // Simplified: attendedClasses * 100 >= (totalClasses + x) * requiredPercentage
    // attendedClasses * 100 / requiredPercentage >= totalClasses + x
    // x <= (attendedClasses * 100 / requiredPercentage) - totalClasses
    const classesToSkip = Math.floor((attendedClasses * 100 / requiredPercentage) - totalClasses);

    // 6. Update HTML with Results
    currentFractionElement.textContent = `${attendedClasses}/${totalClasses}`;
    currentPercentageElement.textContent = `${currentPercentage.toFixed(2)}%`;

    if (currentPercentage < requiredPercentage) {
        actionNeededElement.textContent = `You need to attend ${classesNeeded} more classes to attain ${requiredPercentage}% attendance`;
        
        // Calculate the required fraction for display
        const targetTotal = totalClasses + classesNeeded;
        const targetAttended = attendedClasses + classesNeeded;
        requiredFractionElement.textContent = `${targetAttended}/${targetTotal}`;
        requiredPercentageDisplayElement.textContent = `${(targetAttended / targetTotal * 100).toFixed(2)}%`;

    } else {
        actionNeededElement.textContent = `You can bunk ${classesToSkip} classes while maintaining ${requiredPercentage}% attendance.`;
        
        // Calculate the required fraction for display
        const targetTotal = totalClasses + classesToSkip;
        const targetAttended = attendedClasses;
        requiredFractionElement.textContent = `${targetAttended}/${targetTotal}`;
        requiredPercentageDisplayElement.textContent = `${(targetAttended / targetTotal * 100).toFixed(2)}%`;
    }
}