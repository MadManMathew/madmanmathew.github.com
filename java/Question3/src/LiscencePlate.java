
public class LiscencePlate 
{
	private int numbers;
	private int letters;
	private int population;
	private int remainder;
	
	public LiscencePlate(int population)
	{
		setPopulation(population);
	}
	
	public static LiscencePlate generatePlate(int population)
	{
		LiscencePlate plate = new LiscencePlate(population);
		System.out.println("Population: " + population);
		int remainderMin = Integer.MAX_VALUE;
		
		int numberOfCharacters = 1;
		int afterRemainderReachedCount = 0;
		boolean reachedRemainder = false;
		
		//Once over the remainder, try 1 extra charater combinations
		while( afterRemainderReachedCount<2)
		{	
			//loop trough all combination of letters and numbers for x number of charaters
			for(int i = 0; i <= numberOfCharacters; i ++)
			{
				int j = numberOfCharacters - i;
				int remain = remainder(population,i,j);
				if(remain >= 0)
				{
					reachedRemainder = true;
					//if remaining or excess is less than min, store it
					if(remain < remainderMin)
					{
						remainderMin = remain;
						plate.setNumbers(i);
						plate.setLetters(j);
						plate.setRemainder(remainderMin);
					}
				}
				System.out.println("remainder: " + remain + "numbers: "+ i + "letters:" + j);
			}
			if(reachedRemainder==true)
				afterRemainderReachedCount++;
			numberOfCharacters++;
		}
		
		System.out.println("minRemain: " + remainderMin);
		return plate;
	}
	
	private static int remainder(int population, int numbers, int letters)
	{
		int plates = 1;
		if(numbers != 0)
			plates*=(int)Math.pow(10.0, numbers);
		if(letters != 0)
			plates*=(int)Math.pow(26.0, letters);
		return  plates - population;

	}
	
	public static void main(String[] args)
	{
		LiscencePlate p = generatePlate(10);
		System.out.println(p.generateExample());
		p = generatePlate(26);
		System.out.println(p.generateExample());
		p = generatePlate(32);
		System.out.println(p.generateExample());
		p = generatePlate(100);
		System.out.println(p.generateExample());
		p = generatePlate(260);
		System.out.println(p.generateExample());
		p = generatePlate(261);
		System.out.println(p.generateExample());
		p = generatePlate(100000);
		System.out.println(p.generateExample());
		p = generatePlate(1000000);
		System.out.println(p.generateExample());
	}
	
	public void setNumbers(int numbers)
	{
		this.numbers = numbers;
	}
	
	public int getNumbers()
	{
		return this.numbers;
	}
	
	public void setLetters(int letters)
	{
		this.letters = letters;
	}
	
	public int getLetters()
	{
		return this.letters;
	}
	
	public void setPopulation(int population)
	{
		this.population = population;
	}
	
	public int getPopulation()
	{
		return this.population;
	}
	
	public void setRemainder(int remainder)
	{
		this.remainder = remainder;
	}
	
	public int getRemainder()
	{
		return this.remainder;
	}
	
	public String generateExample()
	{
		String exampleString = "\"";
		for(int i = 0; i < letters;i++)
			exampleString = exampleString.concat(Character.toString(Character.toChars((int) (65+Math.random()*26))[0]));
		if(letters>0 && numbers>0)
			exampleString = exampleString.concat("-");
		for(int i = 0; i < numbers;i++)
			exampleString = exampleString.concat(String.valueOf((int)(Math.random()*9)));
		exampleString = exampleString.concat("\"");		
		return exampleString;
	}
	
	@Override
	public String toString()
	{
		return "Letters: " + letters + ", Numbers: " + numbers + ",Remainder: " + remainder + ", Example: " + generateExample();
	}
}
