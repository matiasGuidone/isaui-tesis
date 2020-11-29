 
    public class FormulaConexion<T> : ObjetoConexion<formula>
    {
       
        private static FormulaConexion<T> instance;
         public static FormulaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new FormulaConexion<T>(new formula());
                return instance;
            }
        } 
        private FormulaConexion(formula aux): base(aux){ 
            
        }
        
    }