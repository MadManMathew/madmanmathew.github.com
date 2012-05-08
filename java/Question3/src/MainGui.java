import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JApplet;
import javax.swing.JLabel;
import javax.swing.JTextField;


public class MainGui extends JApplet implements ActionListener 
{

	private static final long serialVersionUID = 1L;
	private Button calculateButton;
	private JLabel resultLabel;
	private JTextField populationInputTextField;
	
	public void init() 
	{
	    try {
	        javax.swing.SwingUtilities.invokeAndWait(new Runnable() {
	            public void run() {
	                createGUI();
	                setSize(400, 100);
	            }
	        });
	    } catch (Exception e) {
	        System.err.println("createGUI didn't successfully complete");
	    }
	}

	private void createGUI() 
	{
	    getContentPane().setLayout(new BorderLayout(10,10));
	    
	    JLabel descriptionLabel = new JLabel("Find the simplest Liscence plate pattern with the least amount of excess.");
	    descriptionLabel.setHorizontalAlignment(JLabel.CENTER);
	    getContentPane().add(descriptionLabel, BorderLayout.PAGE_START);
	    
	    JLabel populationLabel = new JLabel("Population:");
	    getContentPane().add(populationLabel, BorderLayout.LINE_START);
	    
	    populationInputTextField = new JTextField("",20);
	    getContentPane().add(populationInputTextField, BorderLayout.CENTER);
	    
	    calculateButton = new Button("Calculate"); 
	    calculateButton.addActionListener(this);
	    getContentPane().add(calculateButton, BorderLayout.LINE_END);
	    
	    
	    resultLabel = new JLabel( "?");
	    resultLabel.setFont(new Font(Font.SERIF, Font.BOLD, 16));
	    getContentPane().add(resultLabel,BorderLayout.PAGE_END);
	    resultLabel.setHorizontalAlignment(JLabel.CENTER);
	    
	    
	}
	
	 public void actionPerformed(ActionEvent evt)  
     { 
          if (evt.getSource() == calculateButton)  
          {
        	  Integer population = null;
        	  try{
        		  population = Integer.valueOf(populationInputTextField.getText());
        	  }
        	  catch (NumberFormatException e) {
        	  }
        	  if(population != null)
        	  {
        		  LiscencePlate plate = LiscencePlate.generatePlate(population.intValue());
            	  resultLabel.setText(plate.toString());
        	  }
        	  else
        	  {
        		  resultLabel.setText("Numbers Only");
        	  }
               repaint();
          }
     } 
}
