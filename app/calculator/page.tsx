Create a new page at /calculator called "Find My Daya Fit"

It should have:
- 3 number inputs: Bust, Waist, Hip
- Toggle for inches / cm
- Button "Calculate My Body Type"

Logic:
- Convert cm to inches if needed (divide by 2.54)
- Hourglass if |B-H|/B < 0.05 and (B-W)/B > 0.25
- Pear if H > B*1.05
- Inverted Triangle if B > H*1.05
- Apple if W > B and W > H
- Else Rectangle

Sizing: Use this chart
US 0: 32-24-34
US 4: 34-26-36
US 6: 35-27-37
US 8: 36-28-38
US 10: 37.5-29.5-39.5
US 12: 39-31-41
US 16: 43-35-45
US 20: 47-39-49
For Pear size based on hip, Inverted based on bust, Apple based on waist, others on overall balance. UK = US+4, EU = US+32.

Result section:
- Show "You are: PEAR"
- Show math like 34-29-40
- Show US/UK/EU size
- Show What works / Avoid for each type
- Show 4 placeholder boxes for affiliate links
- Add expandable range table for that body type
- Add email input "Send my results"

Use black and white minimal design, Tailwind, rounded corners.
